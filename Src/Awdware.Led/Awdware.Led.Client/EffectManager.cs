using LedController.Models.Effects;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace LedController
{
    public class EffectManager : IDisposable
    {
        private ArduinoSerial _arduinoSerial;
        private byte[] _data;
        private DateTime _lastRenderTime = DateTime.UtcNow.AddDays(-1);

        public uint LedCount { get; private set; }
        public LedEffect CurrentEffect { get; private set; }

        public EffectManager(uint ledCount, ArduinoSerial arduinoSerial)
        {
            this.LedCount = ledCount;
            this._arduinoSerial = arduinoSerial;
            Task task = Task.Run(RenderEffect);
        }

        public void StartEffect(LedEffect effect)
        {
            _lastRenderTime = DateTime.UtcNow.AddDays(-1);
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
                        _data = data;
                        CurrentEffect.Rendered();
                        _lastRenderTime = DateTime.UtcNow;
                        _arduinoSerial.WriteToArduino(_data);
                    }
                    else
                    {
                        if(DateTime.UtcNow - _lastRenderTime > TimeSpan.FromMilliseconds(500))
                        {
                            _arduinoSerial.WriteToArduino(_data);
                            _lastRenderTime = DateTime.UtcNow;
                        }
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
