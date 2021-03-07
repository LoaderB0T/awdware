import { animate, group, query, style, transition, trigger } from '@angular/animations';

const slideUpDown = [
  query(':enter, :leave', style({ position: 'fixed', height: '100%', width: '100%' }), { optional: true }),
  group([
    query(
      ':enter',
      [
        style({ transform: 'translateY(calc({{dir}} * 100%))', opacity: '0' }),
        animate('300ms cubic-bezier(0.970, -0.080, 0.555, 1.160)', style({ transform: 'translateY(0)', opacity: '1' }))
      ],
      { optional: true }
    ),
    query(
      ':leave',
      [
        style({ transform: 'translateY(0)', opacity: 1 }),
        animate(
          '300ms cubic-bezier(0.970, -0.080, 0.555, 1.160)',
          style({ transform: 'translateY(calc({{dir}} * -100%))', opacity: '0' })
        )
      ],
      { optional: true }
    ),
    query(':leave *', [style({}), animate(1, style({}))], { optional: true })
  ])
];

export const slideInAnimation = trigger('routeAnimations', [transition('* <=> *', slideUpDown)]);
