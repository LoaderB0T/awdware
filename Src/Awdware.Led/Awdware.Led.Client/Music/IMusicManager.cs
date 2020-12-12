using System;
using System.Collections.Generic;
using System.Text;

namespace LedController.Music
{
    interface IMusicManager
    {
        private static WindowsMusicManager _instance;

        public static IMusicManager GetInstance()
        {
            if (_instance == null)
            {
                _instance = new WindowsMusicManager();
            }
            return _instance;
        }

        public int[] GetSpectrum(uint rowCount, uint maxValue);
        public float GetCurrentVolume();
    }
}
