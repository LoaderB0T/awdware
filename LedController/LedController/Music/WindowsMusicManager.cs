using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Runtime.InteropServices;
using System.Text;
using NAudio;
using NAudio.CoreAudioApi;
using NAudio.Dsp;
using NAudio.Wave;
using NAudio.Wave.SampleProviders;

namespace LedController.Music
{
    class WindowsMusicManager : IMusicManager, IDisposable
    {
        private readonly WasapiLoopbackCapture _loopback;

        private object _lock;
        private int _fftPos;
        private int _fftLength;
        private Complex[] _fftBuffer;
        private float[] _lastFftBuffer;
        private bool _fftBufferAvailable;
        private int _m;

        public WindowsMusicManager()
        {
            this._lock = new object();
            this._m = (int)Math.Log(this._fftLength, 2.0);
            this._fftLength = 2048; // 44.1kHz.
            this._fftBuffer = new Complex[this._fftLength];
            this._lastFftBuffer = new float[this._fftLength];


            MMDeviceEnumerator enumerator = new MMDeviceEnumerator();
            var devices = enumerator.EnumerateAudioEndPoints(DataFlow.All, DeviceState.Active);
            var device = devices.ElementAt(0);
            _loopback = new WasapiLoopbackCapture(device);
            _loopback.DataAvailable += Loopback_DataAvailable;
            _loopback.StartRecording();
            enumerator.Dispose();
        }

        public WaveFormat Format
        {
            get
            {
                return this._loopback.WaveFormat;
            }
        }

        private float[] ConvertByteToFloat(byte[] array, int length)
        {
            int samplesNeeded = length / 4;
            float[] floatArr = new float[samplesNeeded];

            for (int i = 0; i < samplesNeeded; i++)
            {
                floatArr[i] = BitConverter.ToSingle(array, i * 4);
            }

            return floatArr;
        }

        private void Loopback_DataAvailable(object sender, WaveInEventArgs e)
        {
            // Convert byte[] to float[].
            float[] data = ConvertByteToFloat(e.Buffer, e.BytesRecorded);

            // For all data. Skip right channel on stereo (i += this.Format.Channels).
            for (int i = 0; i < data.Length; i += this.Format.Channels)
            {
                this._fftBuffer[_fftPos].X = (float)(data[i] * FastFourierTransform.BlackmannHarrisWindow(_fftPos, _fftLength));
                this._fftBuffer[_fftPos].Y = 0;
                this._fftPos++;

                if (this._fftPos >= this._fftLength)
                {
                    this._fftPos = 0;

                    // NAudio FFT implementation.
                    FastFourierTransform.FFT(true, this._m, this._fftBuffer);
                    this._fftBufferAvailable = true;
                }
            }
        }

        private Complex[] GetFFTData()
        {
            lock (this._lock)
            {
                // Use last available buffer.
                if (this._fftBufferAvailable)
                {
                    return this._fftBuffer;
                }
                return null;
            }
        }

        public void Dispose()
        {
            _loopback.Dispose();
        }

        public int[] GetSpectrum(int rowCount, int maxValue)
        {
            var result = new int[rowCount];
            var fftData = GetFFTData();
            if (fftData == null) return Array.Empty<int>();
            var binsPerPoint = (int)Math.Ceiling((double)fftData.Length / 2 / rowCount);
            if (fftData != null)
            {
                for (int n = 0; n < fftData.Length / 2; n += binsPerPoint)
                {
                    // averaging out bins
                    double yPos = 0;
                    for (int b = 0; b < binsPerPoint; b++)
                    {
                        yPos += GetYPosLog(fftData[n + b], maxValue);
                    }
                    result[n / binsPerPoint] = (int)(yPos / binsPerPoint);
                }
            }
            return result;
        }

        private double GetYPosLog(Complex c, int maxValue)
        {
            // not entirely sure whether the multiplier should be 10 or 20 in this case.
            // going with 10 from here http://stackoverflow.com/a/10636698/7532
            double intensityDB = 10 * Math.Log10(Math.Sqrt(c.X * c.X + c.Y * c.Y));
            double minDB = -90;
            if (intensityDB < minDB) intensityDB = minDB;
            double percent = intensityDB / minDB;
            // we want 0dB to be at the top (i.e. yPos = 0)
            double yPos = percent * maxValue;
            return yPos;
        }
    }
}
