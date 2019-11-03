import { LedEffectProperty } from './led-effect-property.model';
import { LedConfigurationDto, LedEffectDto, LedEffectPropertyDto, LedEffectPropertyKind, LedEffectKind } from 'src/app/models/application-facade';
import { LedEffectNumberProperty } from './led-effect-number-property.model';
import { LedEffectBoolProperty } from './led-effect-bool-property.model';
import { LedEffectColorProperty } from './led-effect-color-property.model';

export class LedEffect {
  public name: string;
  public id: string;
  public props: LedEffectProperty[];
  public effectKind: LedEffectKind;
  public hasPendingChanges: boolean = false;

  constructor(name: string, effectKind: LedEffectKind) {
    this.id = 'tmp';
    this.name = name;
    this.effectKind = effectKind;
    this.props = new Array<LedEffectProperty>();
    this.getDefaultParams();
  }

  public static fromDto(dto: LedConfigurationDto): LedEffect {
    const newLedConfig = new LedEffect(dto.name, dto.ledEffect.effectKind);
    newLedConfig.id = dto.id;
    newLedConfig.props = new Array<LedEffectProperty>();
    if (dto.ledEffect.properties) {
      newLedConfig.props = dto.ledEffect.properties.map(propDto => {
        switch (propDto.effectType) {
          case LedEffectPropertyKind.BOOL:
            return new LedEffectBoolProperty(propDto.id, propDto.name, propDto.value);
          case LedEffectPropertyKind.COLOR:
            return new LedEffectColorProperty(propDto.id, propDto.name, propDto.value);
          case LedEffectPropertyKind.NUMBER:
            return new LedEffectNumberProperty(propDto.id, propDto.name, propDto.value, propDto.minValue, propDto.maxValue);
          default:
            return null;
        }
      });
    }
    return newLedConfig;
  }

  public toDto(): LedConfigurationDto {
    const ledCOnfigDto = new LedConfigurationDto();
    ledCOnfigDto.id = this.id;
    ledCOnfigDto.name = this.name;

    ledCOnfigDto.ledEffect = new LedEffectDto();
    ledCOnfigDto.ledEffect.properties = this.props.map(prop => {
      const propDto = new LedEffectPropertyDto();

      if (prop.effectType === LedEffectPropertyKind.NUMBER) {
        propDto.maxValue = (prop as LedEffectNumberProperty).maxVal;
        propDto.minValue = (prop as LedEffectNumberProperty).minVal;
      }

      propDto.id = prop.id;
      propDto.name = prop.name;
      propDto.effectType = prop.effectType;
      propDto.value = prop.value;
      return propDto;
    });

    return ledCOnfigDto;
  }

  private getDefaultParams() {
    switch (this.effectKind) {
      case LedEffectKind.PIXEL: {
        this.props.push(new LedEffectColorProperty(1, 'Color', '#FFFFFF'));
        this.props.push(new LedEffectColorProperty(2, 'Background Color', '#000000'));
        this.props.push(new LedEffectBoolProperty(3, 'Music Reactive', false));
        this.props.push(new LedEffectNumberProperty(4, 'Speed', 30, 5, 255));
        this.props.push(new LedEffectNumberProperty(5, 'Count', 200, 1, 1000));
        this.props.push(new LedEffectBoolProperty(6, 'Even Colors', true));
        break;
      }
    }
  }
}
