import { LedEffectProperty } from './led-effect-property.model';
import { LedEffectNumberProperty } from './led-effect-number-property.model';
import { LedEffectBoolProperty } from './led-effect-bool-property.model';
import { LedEffectColorProperty } from './led-effect-color-property.model';
import { LedEffectStringProperty } from './led-effect-string-property.model';
import {
  LedConfigurationDto,
  LedEffectKind,
  LedEffectPropertyKind,
  LedEffectDto,
  LedEffectPropertyDto
} from './application-facade';

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
            return new LedEffectBoolProperty(propDto.id, propDto.name, propDto.value && true);
          case LedEffectPropertyKind.COLOR:
            return new LedEffectColorProperty(propDto.id, propDto.name, propDto.value);
          case LedEffectPropertyKind.NUMBER:
            return new LedEffectNumberProperty(
              propDto.id,
              propDto.name,
              Number.parseInt(propDto.value, 10),
              propDto.minValue,
              propDto.maxValue
            );
          case LedEffectPropertyKind.STRING:
            return new LedEffectStringProperty(propDto.id, propDto.name, propDto.value);
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
    ledCOnfigDto.ledEffect.effectKind = this.effectKind;
    ledCOnfigDto.ledEffect.properties = this.props.map(prop => {
      const propDto = new LedEffectPropertyDto();

      if (prop.effectType === LedEffectPropertyKind.NUMBER) {
        propDto.maxValue = (prop as LedEffectNumberProperty).maxVal;
        propDto.minValue = (prop as LedEffectNumberProperty).minVal;
      }

      propDto.id = prop.id;
      propDto.name = prop.name;
      propDto.effectType = prop.effectType;
      if (typeof prop.value !== 'string') {
        propDto.value = prop.value.toString();
      } else {
        propDto.value = prop.value;
      }
      return propDto;
    });

    return ledCOnfigDto;
  }

  private getDefaultParams() {
    switch (this.effectKind) {
      case LedEffectKind.STATIC: {
        this.props.push(new LedEffectColorProperty(1, 'Color', '#FFFFFF'));
        break;
      }
      case LedEffectKind.PIXEL: {
        this.props.push(new LedEffectColorProperty(1, 'Color', '#FFFFFF'));
        this.props.push(new LedEffectColorProperty(2, 'Background Color', '#000000'));
        this.props.push(new LedEffectNumberProperty(3, 'Speed', 30, 0, 255));
        this.props.push(new LedEffectNumberProperty(4, 'Count', 200, 1, 1000));
        this.props.push(new LedEffectBoolProperty(5, 'Even Colors', true));
        break;
      }
      case LedEffectKind.MIX: {
        this.props.push(new LedEffectColorProperty(1, 'Color A', '#FFFFFF'));
        this.props.push(new LedEffectColorProperty(2, 'Color B', '#000000'));
        this.props.push(new LedEffectNumberProperty(3, 'Speed', 30, 0, 255));
        this.props.push(new LedEffectBoolProperty(4, 'Animated', false));
        break;
      }
      case LedEffectKind.STRIPE: {
        this.props.push(new LedEffectColorProperty(1, 'Color', '#FFFFFF'));
        this.props.push(new LedEffectColorProperty(2, 'Background Color', '#000000'));
        this.props.push(new LedEffectNumberProperty(3, 'Speed', 30, 0, 255));
        this.props.push(new LedEffectBoolProperty(4, 'Switch Direction', false));
        this.props.push(new LedEffectBoolProperty(5, 'Two Sides', false));
        this.props.push(new LedEffectBoolProperty(6, 'Music Reactive', false));
        break;
      }
      case LedEffectKind.WEB: {
        this.props.push(new LedEffectStringProperty(1, 'URL', ''));
        this.props.push(new LedEffectNumberProperty(2, 'Interval', 30, 5, 300));
        break;
      }
      case LedEffectKind.MUSIC: {
        this.props.push(new LedEffectColorProperty(1, 'Color', '#FFFFFF'));
        this.props.push(new LedEffectColorProperty(2, 'Background Color', '#000000'));
        this.props.push(new LedEffectNumberProperty(3, 'Speed', 30, 0, 255));
        this.props.push(new LedEffectBoolProperty(4, 'Spectrum', false));
        this.props.push(new LedEffectBoolProperty(5, 'Two Sides', false));
        this.props.push(new LedEffectBoolProperty(6, 'Switch Direction', false));
        break;
      }
    }
  }
}
