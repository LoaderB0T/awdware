using Awdware.Facade.Dtos.Led;
using Awdware.Facade.Led.Models;
using LedController.Models.Effects;
using System;
using System.Collections.Generic;
using System.Linq;

namespace LedController
{
    public static class LedEffectBuilder
    {
        public static LedEffect GetEffect(LedConfigurationDto dto, uint ledCount)
        {
            if (dto == null)
            {
                throw new ArgumentNullException(nameof(dto));
            }
            var props = dto.LedEffect.Properties;
            return dto.LedEffect.EffectKind switch
            {
                LedEffectKind.Static => new StaticEffect(ledCount, dto.Name,
                    GetColorProperty(props, 1)
                ),
                LedEffectKind.Pixel => new PixelEffect(ledCount, dto.Name,
                    GetColorProperty(props, 1),
                    GetColorProperty(props, 2),
                    GetIntProperty(props, 3),
                    GetIntProperty(props, 4),
                    GetBoolProperty(props, 5)
                ),
                LedEffectKind.Stripe => new StripeEffect(ledCount, dto.Name,
                    GetColorProperty(props, 1),
                    GetColorProperty(props, 2),
                    GetIntProperty(props, 3),
                    GetBoolProperty(props, 4),
                    GetBoolProperty(props, 4)
                ),
                LedEffectKind.Music => new MusicEffect(ledCount, dto.Name,
                    GetColorProperty(props, 1),
                    GetColorProperty(props, 2),
                    GetIntProperty(props, 3)
                ),
                LedEffectKind.Web => new WebEffect(ledCount, dto.Name,
                    GetStringProperty(props, 1),
                    GetUintProperty(props, 2)
                ),
                _ => null,
            };
        }

        private static int GetIntProperty(IEnumerable<LedEffectPropertyDto> props, int id)
        {
            var prop = props.First(x => x.Id == id);
            if (prop.EffectType == LedEffectPropertyKind.Number)
            {
                var success = int.TryParse(prop.Value, out var val);
                if (success)
                {
                    return val;
                }
            }
            throw new InvalidOperationException("Could not get integer value from parameter");
        }

        private static uint GetUintProperty(IEnumerable<LedEffectPropertyDto> props, int id)
        {
            var prop = props.First(x => x.Id == id);
            if (prop.EffectType == LedEffectPropertyKind.Number)
            {
                var success = uint.TryParse(prop.Value, out var val);
                if (success)
                {
                    return val;
                }
            }
            throw new InvalidOperationException("Could not get unsigned integer value from parameter");
        }

        private static bool GetBoolProperty(IEnumerable<LedEffectPropertyDto> props, int id)
        {
            var prop = props.First(x => x.Id == id);
            if (prop.EffectType == LedEffectPropertyKind.Bool)
            {
                var success = bool.TryParse(prop.Value, out var val);
                if (success)
                {
                    return val;
                }
            }
            throw new InvalidOperationException("Could not get bool value from parameter");
        }

        private static string GetStringProperty(IEnumerable<LedEffectPropertyDto> props, int id)
        {
            var prop = props.First(x => x.Id == id);
            if (prop.EffectType == LedEffectPropertyKind.String)
            {
                return prop.Value;
            }
            throw new InvalidOperationException("Could not get bool value from parameter");
        }

        private static RgbColor GetColorProperty(IEnumerable<LedEffectPropertyDto> props, int id)
        {
            var prop = props.First(x => x.Id == id);
            if (prop.EffectType == LedEffectPropertyKind.Color)
            {
                return new RgbColor(prop.Value);
            }
            throw new InvalidOperationException("Could not get color value from parameter");
        }
    }
}
