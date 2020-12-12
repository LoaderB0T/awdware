using NAudio.CoreAudioApi;
using NAudio.Dsp;
using NAudio.Wave;
using System;
using System.Collections.Generic;
using System.Linq;

namespace LedController.Music
{
    class WindowsMusicManager : IMusicManager
    {
        private MMDevice _device;
        private List<float> _lastLevels;
        private object _lock;
        private int _fftPos;
        private int _fftLength;
        private Complex[] _fftBuffer;
        private float[] _lastFftBuffer;
        private bool _fftBufferAvailable;
        private int _m;
        private bool _spectrumInitialized = false;

        public WindowsMusicManager()
        {
            _lastLevels = new List<float>();
            var enumerator = new MMDeviceEnumerator();
            _device = enumerator.GetDefaultAudioEndpoint(DataFlow.Render, Role.Console);
        }


        public int[] GetSpectrum(uint rowCount, uint maxValue)
        {
            return null;
        }


        static float Map(float val, float oldMin, float oldMax, float newMin, float newMax)
        {
            return ((val - oldMin) / (oldMax - oldMin) * (newMax - newMin) + newMin);
        }


        public float GetCurrentVolume()
        {
            var volume = _device.AudioMeterInformation.MasterPeakValue;
            this._lastLevels.Add(volume);
            if (_lastLevels.Count > 200)
            {
                _lastLevels.RemoveAt(0);
            }

            var smoothMin = (int)((7 * _lastLevels.Min() + 3 * _lastLevels.Average()) / 10);
            var maxVolume = _lastLevels.Max();

            var result = Map(volume, smoothMin, maxVolume > 0 ? maxVolume : 1, 0f, 1f);

            return result;
        }
    }
}