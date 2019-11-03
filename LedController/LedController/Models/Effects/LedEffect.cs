using System;

namespace LedController.Models.Effects
{
    public abstract class LedEffect
    {
        protected DateTime lastRenderTime;
        public abstract byte[] Render();
    }
}
