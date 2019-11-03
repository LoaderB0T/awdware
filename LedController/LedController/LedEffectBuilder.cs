using LedController.Models.Effects;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using WebApi.Dtos.Led;

namespace LedController
{
    public static class LedEffectBuilder
    {
        public static LedEffect GetEffect(LedConfigurationDto dto, int ledCount)
        {
            var props = dto.LedEffect.Properties;
            return dto.LedEffect.EffectKind switch
            {
                LedEffectKind.STATIC => new StaticEffect(ledCount,
                    GetColorPropery(props, 1)
                ),
                LedEffectKind.PIXEL => new PixelEffect(ledCount,
                    GetColorPropery(props, 1),
                    GetColorPropery(props, 2),
                    GetIntPropery(props, 3),
                    GetIntPropery(props, 4),
                    GetBoolPropery(props, 5)
                ),
                _ => null,
            };
        }

        private static int GetIntPropery(IEnumerable<LedEffectPropertyDto> props, int id)
        {
            var prop = props.First(x => x.Id == id);
            if (prop.EffectType == LedEffectPropertyKind.NUMBER)
            {
                var success = int.TryParse(prop.Value, out var val);
                if (success)
                {
                    return val;
                }
            }
            throw new InvalidOperationException("Could not get integer value from parameter");
        }
        private static bool GetBoolPropery(IEnumerable<LedEffectPropertyDto> props, int id)
        {
            var prop = props.First(x => x.Id == id);
            if (prop.EffectType == LedEffectPropertyKind.BOOL)
            {
                var success = bool.TryParse(prop.Value, out var val);
                if (success)
                {
                    return val;
                }
            }
            throw new InvalidOperationException("Could not get bool value from parameter");
        }
        private static RgbColor GetColorPropery(IEnumerable<LedEffectPropertyDto> props, int id)
        {
            var prop = props.First(x => x.Id == id);
            if (prop.EffectType == LedEffectPropertyKind.COLOR)
            {
                return new RgbColor(prop.Value);
            }
            throw new InvalidOperationException("Could not get color value from parameter");
        }
    }
}
