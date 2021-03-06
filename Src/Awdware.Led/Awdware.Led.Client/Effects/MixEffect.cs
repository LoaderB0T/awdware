using Awdware.Led.Facade.Models;

namespace LedController.Models.Effects
{
    internal class MixEffect : LedEffect
    {
        private RgbColor _colorA;
        private RgbColor _colorB;
        private readonly int _speed;
        private readonly bool _animated;
        private int prog = 1;
        private int progDir = 1;

        public MixEffect(uint ledCount, string name, RgbColor colorA, RgbColor colorB, int speed, bool animated) : base(ledCount, name)
        {
            _colorA = colorA;
            _colorB = colorB;
            _speed = speed;
            _animated = animated;
        }

        public static float Map(float value, float fromSource, float toSource, float fromTarget, float toTarget)
        {
            return (value - fromSource) / (toSource - fromSource) * (toTarget - fromTarget) + fromTarget;
        }

        public override byte[] Render()
        {
            if (TimePassed(_speed))
            {
                if (!_animated)
                {
                    prog = (int)LedCount / 2;
                }
                else
                {
                    if (prog >= LedCount || prog == 0)
                    {
                        progDir *= -1;

                    }
                    prog += progDir;
                }


                for (int i = 1; i <= LedCount; i++)
                {
                    float perc;

                    if (i < prog)
                    {
                        perc = Map(i, 1, prog, 0, 0.5f);
                    }
                    else
                    {
                        perc = Map(i, prog, LedCount, 0.5f, 1f);
                    }
                    var color = RgbColor.Transition(_colorA, _colorB, perc);
                    Image.Leds[i - 1].SetColor(color);
                }
                return Image.ToByteArray();

            }
            return null;
        }
    }
}