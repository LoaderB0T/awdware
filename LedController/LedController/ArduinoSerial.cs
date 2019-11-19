using System;
using System.Collections.Generic;
using System.Globalization;
using System.IO;
using System.IO.Ports;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading;

namespace LedController
{
    public class ArduinoSerial : IDisposable
    {
        private SerialPort _port;
        private bool fileLogging = false;
        private bool initialized = false;
        public event EventHandler<uint> Initialized;

        public ArduinoSerial(string comPortName)
        {
            _port = new SerialPort();
            _port.PortName = comPortName;
            _port.BaudRate = 115200;
            try
            {
                _port.Open();
            }
            catch (Exception ex)
            {
                Logger.LogError("Unable to open port: " + comPortName, ex);
                Environment.Exit(-1);
            }
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
                    var receivedData = _port.ReadExisting();
                    var formatRegex = new Regex(@"^leds:([0-9]+)$");
                    if (formatRegex.IsMatch(receivedData))
                    {
                        if(initialized)
                        {
                            return;
                        }
                        initialized = true;
                        var match = formatRegex.Match(receivedData);
                        var grp = match.Groups[0].Value;
                        var ledCountVal = grp.Split(":")[1];
                        Console.WriteLine("Got Led Count: " + ledCountVal);
                        this.Initialized?.Invoke(this, uint.Parse(ledCountVal, NumberStyles.Integer, CultureInfo.InvariantCulture));
                    }
                }
            }
        }

        public void WriteToArduino(byte[] buffer)
        {
            if (buffer == null)
            {
                throw new ArgumentNullException(nameof(buffer));
            }
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

        #region IDisposable Support
        private bool disposedValue = false; // To detect redundant calls

        protected virtual void Dispose(bool disposing)
        {
            if (!disposedValue)
            {
                if (disposing)
                {
                    this._port.Dispose();
                }
                disposedValue = true;
            }
        }

        ~ArduinoSerial()
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
