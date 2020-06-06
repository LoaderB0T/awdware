
import * as Awdware_Core_Presentation from '@gah/Awdware.Core.Presentation/*';

import * as Awdware_Shared_Presentation from '@gah/Awdware.Shared.Presentation/*';

import * as Awdware_Games_Presentation from '@gah/Awdware.Games.Presentation/*';

import * as Awdware_Led_Presentation from '@gah/Awdware.Led.Presentation/*';

export const modulePackages = [
  {
    module: Awdware_Core_Presentation,
    isEntry: true,
    isLibraryOnly: false,
  },
  {
    module: Awdware_Shared_Presentation,
    isEntry: false,
    isLibraryOnly: false,
  },
  {
    module: Awdware_Games_Presentation,
    isEntry: false,
    isLibraryOnly: false,
  },
  {
    module: Awdware_Led_Presentation,
    isEntry: false,
    isLibraryOnly: false,
  }
];

export const gahModules = [
  Awdware_Core_Presentation.CoreModule,
  Awdware_Shared_Presentation.AwdwareCoreSharedModule,
  Awdware_Games_Presentation.GamesModule,
  Awdware_Led_Presentation.LedLazyModule
];
