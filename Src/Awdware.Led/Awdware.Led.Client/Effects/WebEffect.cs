using System;
using System.Net.Http;
using System.Linq;
using System.Text.Json;
using System.Collections.Generic;
using Awdware.Led.Facade.Models;
using Awdware.Led.Facade.Dtos;

namespace LedController.Models.Effects
{
    internal class WebEffect : LedEffect
    {
        private readonly Uri _apiUrl;
        private readonly uint _interval;
        private LedImage _ledImageFrom = null;
        private LedImage _ledImageTo = null;
        private bool _activeTransition = false;
        private float _transitionProgress = 0.0f;

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
                        var ledImageDto = JsonSerializer.Deserialize<LedImageDto>(jsonString, options);
                        var ledImage = LedImage.FromDto(ledImageDto);
                        if (ledImage.TransitionTime != 0)
                        {
                            if (_ledImageTo == null)
                            {
                                _ledImageTo = ledImage;
                                for (int i = 0; i < ledImage.Leds.Count; i++)
                                {
                                    Image.Leds[i] = ledImage.Leds[i];
                                }
                            }
                            else
                            {
                                if (!_ledImageTo.Equals(ledImage))
                                {
                                    _ledImageFrom = _ledImageTo;
                                    _ledImageTo = ledImage;
                                    _activeTransition = true;
                                    _transitionProgress = 0.0f;
                                }
                            }
                        }
                        else
                        {

                            for (int i = 0; i < ledImage.Leds.Count; i++)
                            {
                                Image.Leds[i] = ledImage.Leds[i];
                            }
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
                if (!_activeTransition)
                {
                    return Image.ToByteArray();
                }
            }
            if (_activeTransition)
            {
                _transitionProgress += (float)5 / _ledImageTo.TransitionTime;
                if (_transitionProgress > 1.0f)
                {
                    _transitionProgress = 1.0f;
                    _activeTransition = false;
                }

                for (int i = 0; i < LedCount; i++)
                {
                    var oldC = _ledImageFrom.Leds[i];
                    var newC = _ledImageTo.Leds[i];
                    var resC = RgbColor.Transition(oldC, newC, _transitionProgress);
                    Image.Leds[i] = resC;
                }

                return Image.ToByteArray();
            }
            return null;
        }
    }
}
