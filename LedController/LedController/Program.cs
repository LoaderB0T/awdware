using System;

namespace LedController
{
    class Program
    {
        static void Main(string[] args)
        {
            Console.WriteLine("Hello World!");
            var socket = new SocketService();
            var mgr = new EffectManager();
            socket.OnEffectSelected += ((sender, args) =>
            {
                var effect = LedEffectBuilder.GetEffect(args, mgr.LedCount);
                mgr.StartEffect(effect);
            });
            Console.ReadLine();
            mgr.Dispose();
        }
    }
}
