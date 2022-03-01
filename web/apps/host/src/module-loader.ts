import { loadRemoteModule } from '@angular-architects/module-federation';

export type ModuleDefinition = [{ name: string; ngModuleName: string; url: string }];
export const loadedModules: { [key: string]: any[] } = {};

const fetchModules = fetch('/modules/modules.json');
const fetchEnvironment = fetch('/environments/environment.json');

export const loadModulesForApp = async (name: string) => {
  const [mR, eR] = await Promise.all([fetchModules, fetchEnvironment]);
  const [m, e] = await Promise.all([mR.json(), eR.json()]);
  const modules = m as ModuleDefinition;
  const environment = e as { [key: string]: any };

  (window as any).__gah__env = environment;

  await Promise.all(
    modules.map(module => {
      return loadRemoteModule({
        exposedModule: './Module',
        remoteEntry: module.url + 'remoteEntry.js',
        type: 'module'
      }).then(m => {
        loadedModules[name] ??= [];
        loadedModules[name].push(m[module.ngModuleName]);
      });
    })
  );
  return loadedModules[name];
};
