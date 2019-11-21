using Awdware.Facade.Led.Dtos;
using Awdware.Facade.Led.Models;
using System;
using System.Net.Http;
using System.Linq;
using System.Text.Json;

namespace LedController.Models.Effects
{
    internal class WebEffect : LedEffect
    {
        private readonly Uri _apiUrl;
        private readonly uint _interval;

        public WebEffect(uint ledCount, string name, string apiUrl, uint interval) : base(ledCount, name)
        {
            _apiUrl = new Uri(apiUrl + "/" + ledCount);
            _interval = interval;
        }

        public override byte[] Render()
        {
            if (TimePassed((int)_interval * 1000))
            {
                var httpClient = new HttpClient();
                HttpResponseMessage res;
                try
                {
                    var httpTask = httpClient.GetAsync(_apiUrl);
                    httpTask.Wait();
                    res = httpTask.Result;
                    httpClient.Dispose();
                }
                catch (Exception)
                {
                    httpClient.Dispose();
                    Image.SetAll(20, 0, 0);
                    return Image.ToByteArray();
                }
                if (res.IsSuccessStatusCode)
                {
                    try
                    {
                        var readTask = res.Content.ReadAsStringAsync();
                        readTask.Wait();
                        var jsonString = readTask.Result;
                        var options = new JsonSerializerOptions
                        {
                            PropertyNamingPolicy = JsonNamingPolicy.CamelCase,
                        };
                        var ledImage = JsonSerializer.Deserialize<LedImageDto>(jsonString, options);

                        for (int i = 0; i < ledImage.Leds.Length; i++)
                        {
                            Image.Leds[i] = new RgbColor(ledImage.Leds.ElementAt(i));
                        }
                    }
                    catch (Exception ex)
                    {
                        Logger.LogError("Error during rendering WebEffect", ex);
                    }
                }
                else
                {
                    Image.SetAll(20, 0, 0);
                }
                return Image.ToByteArray();
            }
            return null;
        }
    }
}
