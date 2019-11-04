using LedController.Models.Effects;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace LedController
{
    public class EffectManager
    {
        private ArduinoSerial _arduinoSerial;

        public int LedCount { get; set; } = 30;
        public LedEffect CurrentEffect { get; private set; }

        public EffectManager()
        {
            //this._arduinoSerial = new ArduinoSerial("COM4");
            Task task = Task.Run(RenderEffect);
        }

        public void StartEffect(LedEffect effect)
        {
            CurrentEffect = effect;
            Console.WriteLine("Starting Effect " + CurrentEffect.name);
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
                        //_arduinoSerial.WriteToArduino(data);
                    }
                }
                Thread.Sleep(10);
            }
        }
    }
}
