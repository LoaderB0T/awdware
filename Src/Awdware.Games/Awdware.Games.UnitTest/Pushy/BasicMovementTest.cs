using Awdware.Games.Business.Implementation.Models.Pushy;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Text;

namespace Awdware.Games.UnitTest.Pushy
{
    [TestClass]
    public class BasicMovementTest
    {
        private bool DoMove(PushyGame game, PushyMoveDirection dir)
        {
            var figData = game.Field.GetFigureData("awd");
            var sucess = game.Field.CanMove(figData.Figure, figData.X, figData.Y, (PushyMoveDirection)dir);
            if (!sucess)
                return false;

            game.Field.DoMove(figData.Figure, figData.X, figData.Y, (PushyMoveDirection)dir);
            var gameStr = game.ToString();
            Console.WriteLine(gameStr);
            return true;
        }


        [TestMethod]
        public void MoveBox()
        {
            var game = new PushyGame("awd");
            var gameStr = game.ToString();
            Console.WriteLine(gameStr);
            DoMove(game, PushyMoveDirection.Down);
            DoMove(game, PushyMoveDirection.Down);
        }
    }
}