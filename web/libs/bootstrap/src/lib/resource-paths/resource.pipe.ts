import { Pipe, PipeTransform } from '@angular/core';
import { resourcePath } from './base-path';

@Pipe({
  name: 'resourcePath'
})
export class ResourcePipe implements PipeTransform {
  transform(value: string, ...args: string[]): string {
    if (args.length !== 1) {
      throw new Error('ResourcePipe: Only 1 argument is allowed: the name of the module');
    }
    const moduleName = args[0];
    return resourcePath(moduleName, value);
  }
}
