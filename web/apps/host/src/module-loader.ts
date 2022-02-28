import { loadRemoteModule } from '@angular-architects/module-federation';

export type ModuleDefinition = [{ name: string; ngModuleName: string; url: string }];
export const loadedModules: { [key: string]: any[] } = {};

export const loadModulesForApp = (name: string) => {
  return fetch('/modules/modules.json')
    .then(response => response.json())
    .then(m => m as ModuleDefinition)
    .then(modules => {
      return Promise.all(
        modules.map(module => {
          return loadRemoteModule({
            exposedModule: './Module',
            // remoteName: module.name,
            remoteEntry: module.url + 'remoteEntry.js',
            type: 'module'
          }).then(m => {
            loadedModules[name] ??= [];
            loadedModules[name].push(m[module.ngModuleName]);
          });
        })
      );
    })
    .then(() => {
      return loadedModules[name];
    });
};
