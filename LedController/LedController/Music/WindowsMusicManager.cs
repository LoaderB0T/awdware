using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Runtime.InteropServices;
using System.Text;
using System.Threading;
using ManagedBass;
using ManagedBass.Wasapi;

namespace LedController.Music
{
    class WindowsMusicManager : IMusicManager
    {
        private bool _enable;               //enabled status
        private float[] _fft;               //buffer for fft data
        private WasapiProcedure _process;        //callback function to obtain data
        private int _lastlevel;             //last output level
        private int _hanctr;                //last output level counter
        private List<int> _spectrumdata;   //spectrum data buffer
        private bool _initialized;          //initialized flag

        private List<Tuple<int, string>> _devicelist;
        private int selectedDeviceIndex = 0;

        public WindowsMusicManager()
        {
            _fft = new float[1024];
            _lastlevel = 0;
            _hanctr = 0;
            _process = new WasapiProcedure(Process);
            _spectrumdata = new List<int>();
            _initialized = false;
            _devicelist = new List<Tuple<int, string>>();
            Init();
            Enable = true;
        }

        private void Init()
        {
            for (int i = 0; i < BassWasapi.DeviceCount; i++)
            {
                var device = BassWasapi.GetDeviceInfo(i);
                if (device.IsEnabled && device.IsLoopback)
                {
                    _devicelist.Add(Tuple.Create(i, device.Name));
                }
            }
            Bass.Configure(Configuration.UpdateThreads, false);
            bool result = Bass.Init(0, 44100, DeviceInitFlags.Default, IntPtr.Zero);
            if (!result) throw new Exception("Init Error");
        }

        public bool Enable
        {
            get { return _enable; }
            set
            {
                _enable = value;
                if (value)
                {
                    if (!_initialized)
                    {
                        int devindex = _devicelist[selectedDeviceIndex].Item1;
                        bool result = BassWasapi.Init(devindex, 0, 0, WasapiInitFlags.Buffer, 1f, 0.05f, _process, IntPtr.Zero);
                        if (!result)
                        {
                            var error = Bass.LastError;
                            Logger.LogError(error.ToString());
                        }
                        else
                        {
                            _initialized = true;
                        }
                    }
                    BassWasapi.Start();
                }
                else BassWasapi.Stop(true);
                Thread.Sleep(500);
            }
        }

        public int[] GetSpectrum(int rowCount, int maxValue)
        {
            int ret = BassWasapi.GetData(_fft, (int)DataFlags.FFT2048); //get channel fft data
            if (ret < -1) return Array.Empty<int>();
            int x, y;
            int b0 = 0;

            //computes the spectrum data, the code is taken from a bass_wasapi sample.
            for (x = 0; x < rowCount; x++)
            {
                float peak = 0;
                int b1 = (int)Math.Pow(2, x * 10.0 / (rowCount - 1));
                if (b1 > 1023) b1 = 1023;
                if (b1 <= b0) b1 = b0 + 1;
                for (; b0 < b1; b0++)
                {
                    if (peak < _fft[1 + b0]) peak = _fft[1 + b0];
                }
                y = (int)(Math.Sqrt(peak) * 3 * 255 - 4);
                if (y > 255) y = 255;
                if (y < 0) y = 0;

                var mappedVal = Map(y, 0, 255, 0, maxValue);

                _spectrumdata.Add(mappedVal);
                //Console.Write("{0, 3} ", y);
            }

            var data = _spectrumdata.Select(x => (int)x).ToArray();
            _spectrumdata.Clear();

            int level = BassWasapi.GetLevel();
            if (level == _lastlevel && level != 0) _hanctr++;
            _lastlevel = level;

            //Required, because some programs hang the output. If the output hangs for a 75ms
            //this piece of code re initializes the output so it doesn't make a gliched sound for long.
            if (_hanctr > 3)
            {
                _hanctr = 0;
                Free();
                Bass.Init(0, 44100, DeviceInitFlags.Default, IntPtr.Zero);
                _initialized = false;
                Enable = true;
            }
            return data;
        }

        static int Map(double val, double oldMin, double oldMax, double newMin, double newMax)
        {
            return (int)((val - oldMin) / (oldMax - oldMin) * (newMax - newMin) + newMin);
        }

        public void Free()
        {
            BassWasapi.Free();
            Bass.Free();
        }

        private int Process(IntPtr buffer, int length, IntPtr user)
        {
            return length;
        }

        public double GetCurrentVolume()
        {
            float[] levels = new float[2];
            var a = BassWasapi.GetLevel(levels, levels.Length, LevelRetrievalFlags.Stereo); // Untested and (obviously) untested
            return 0;
        }
    }
}