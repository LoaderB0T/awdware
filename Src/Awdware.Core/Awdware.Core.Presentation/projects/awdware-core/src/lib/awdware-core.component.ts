import { Component, OnInit } from '@angular/core';

export function entryComponent(): ClassDecorator {
  return (constructor: any) => {

  };
}

@entryComponent()
@Component({
  selector: 'lib-awdware-core',
  template: `
    <p>
      awdware-core works!
    </p>
  `,
  styles: []
})
export class AwdwareCoreComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
