using System;
using System.Collections.Generic;
using System.IO;
using System.IO.Ports;
using System.Linq;
using System.Text;
using System.Threading;

namespace LedController
{
    public class ArduinoSerial
    {
        private SerialPort _port;
        private bool fileLogging = false;

        public ArduinoSerial(string comPortName)
        {
            _port = new SerialPort();
            _port.PortName = comPortName;
            _port.BaudRate = 115200;
            _port.Open();
            _port.DataReceived += Port_DataReceived;

            _port.Write(new byte[] { 122, 122, 122, 122, 122 }, 0, 5); // Workaround for false bytes at fist send(s)
            Thread.Sleep(1000);
        }

        private void Port_DataReceived(object sender, SerialDataReceivedEventArgs e)
        {
            while (_port.BytesToRead > 0)
            {
                if (fileLogging)
                {
                    File.AppendAllText(@".\log.txt", _port.ReadExisting());
                }
                else
                {
                    _port.ReadExisting();
                }
            }
        }

        public void WriteToArduino(byte[] buffer)
        {
            if (fileLogging)
            {
                var sendStr = "";
                buffer.ToList().ForEach(x =>
                {
                    sendStr += x + ", ";
                });
                File.AppendAllText(@".\log.txt", sendStr + "\n");
            }

            _port.Write(buffer, 0, buffer.Length);
            Thread.Sleep(6);
        }
    }
}
