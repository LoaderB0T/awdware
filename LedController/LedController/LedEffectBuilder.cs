﻿using LedController.Models.Effects;
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
            if (dto == null)
            {
                throw new ArgumentNullException(nameof(dto));
            }
            var props = dto.LedEffect.Properties;
            return dto.LedEffect.EffectKind switch
            {
                LedEffectKind.Static => new StaticEffect(ledCount, dto.Name,
                    GetColorPropery(props, 1)
                ),
                LedEffectKind.Pixel => new PixelEffect(ledCount, dto.Name,
                    GetColorPropery(props, 1),
                    GetColorPropery(props, 2),
                    GetIntPropery(props, 3),
                    GetIntPropery(props, 4),
                    GetBoolPropery(props, 5)
                ),
                LedEffectKind.Stripe => new StripeEffect(ledCount, dto.Name,
                    GetColorPropery(props, 1),
                    GetColorPropery(props, 2),
                    GetBoolPropery(props, 3),
                    GetIntPropery(props, 4),
                    GetBoolPropery(props, 5),
                    GetBoolPropery(props, 6)
                ),
                _ => null,
            };
        }

        private static int GetIntPropery(IEnumerable<LedEffectPropertyDto> props, int id)
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
        private static bool GetBoolPropery(IEnumerable<LedEffectPropertyDto> props, int id)
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
        private static RgbColor GetColorPropery(IEnumerable<LedEffectPropertyDto> props, int id)
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
