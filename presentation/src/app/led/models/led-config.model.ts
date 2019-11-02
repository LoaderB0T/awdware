import { LedEffectProperty } from './led-effect-property.model';
import { LedConfigurationDto, LedEffectDto, LedEffectPropertyDto, LedEffectPropertyType } from 'src/app/models/application-facade';
import { LedEffectNumberProperty } from './led-effect-number-property.model';
import { LedEffectBoolProperty } from './led-effect-bool-property.model';
import { LedEffectColorProperty } from './led-effect-color-property.model';

export class LedConfig {
  public name: string;
  public id: string;
  public props: LedEffectProperty[];

  constructor(dto: LedConfigurationDto) {
    this.name = dto.name;
    this.id = dto.id;
    this.props = new Array<LedEffectProperty>();
    if (dto.ledEffect.properties) {
      this.props = dto.ledEffect.properties.map(propDto => {
        switch (propDto.effectType) {
          case LedEffectPropertyType.BOOL:
            return new LedEffectBoolProperty(propDto.effectType, propDto.value);
          case LedEffectPropertyType.COLOR:
            return new LedEffectColorProperty(propDto.effectType, propDto.value);
          case LedEffectPropertyType.NUMBER:
            return new LedEffectNumberProperty(propDto.effectType, propDto.value, propDto.minValue, propDto.maxValue);
          default:
            return null;
        }
      });
    }
  }

  public toDto(): LedConfigurationDto {
    const ledCOnfigDto = new LedConfigurationDto();
    ledCOnfigDto.id = this.id;
    ledCOnfigDto.name = this.name;

    ledCOnfigDto.ledEffect = new LedEffectDto();
    ledCOnfigDto.ledEffect.properties = this.props.map(prop => {
      const propDto = new LedEffectPropertyDto();

      if (prop.effectType === LedEffectPropertyType.NUMBER) {
        propDto.maxValue = (prop as LedEffectNumberProperty).maxVal;
        propDto.minValue = (prop as LedEffectNumberProperty).minVal;
      }

      propDto.effectType = prop.effectType;
      propDto.value = prop.value;
      return propDto;
    });

    return ledCOnfigDto;
  }
}
