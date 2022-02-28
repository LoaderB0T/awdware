export class PossibleToolbarItem {
  constructor(public text: string, public icon: string, public action: () => void, public enabled: () => boolean) {}
}
