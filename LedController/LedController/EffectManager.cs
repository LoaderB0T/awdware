using LedController.Models.Effects;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace LedController
{
    public class EffectManager: IDisposable
    {
        private ArduinoSerial _arduinoSerial;

        public int LedCount { get; set; } = 30;
        public LedEffect CurrentEffect { get; private set; }

        public EffectManager()
        {
            this._arduinoSerial = new ArduinoSerial("COM4");
            Task task = Task.Run(RenderEffect);
        }

        public void StartEffect(LedEffect effect)
        {
            CurrentEffect = effect ?? throw new ArgumentNullException(nameof(effect));
            Console.WriteLine("Starting Effect " + CurrentEffect.Name);
        }

        public void RenderEffect()
        {
            while (true)
            {
                if (CurrentEffect != null)
                {
                    var data = CurrentEffect.Render();
                    if (data != null)
                    {
                        _arduinoSerial.WriteToArduino(data);
                    }
                }
                Thread.Sleep(10);
            }
        }

        #region IDisposable Support
        private bool disposedValue = false; // To detect redundant calls

        protected virtual void Dispose(bool disposing)
        {
            if (!disposedValue)
            {
                if (disposing)
                {
                    this._arduinoSerial.Dispose();
                }

                disposedValue = true;
            }
        }

        ~EffectManager()
        {
            // Do not change this code. Put cleanup code in Dispose(bool disposing) above.
            Dispose(false);
        }

        public void Dispose()
        {
            // Do not change this code. Put cleanup code in Dispose(bool disposing) above.
            Dispose(true);
            GC.SuppressFinalize(this);
        }
        #endregion
    }
}
