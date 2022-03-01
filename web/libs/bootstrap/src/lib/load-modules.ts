import { loadRemoteModule } from '@angular-architects/module-federation';
import { environment } from './environment';

export type ModuleDefinition = [{ name: string; ngModuleName: string; url: string }];
export const loadedModules: { [key: string]: any[] } = {};

const fetchModules = fetch('/modules/modules.json')
  .then(x => x.json())
  .catch(() => {
    console.debug('Failed to load modules.json');
    return [];
  });
const fetchEnvironment = fetch('/environments/environment.json')
  .then(x => x.json())
  .catch(() => {
    console.debug('Failed to load environment.json');
    return {};
  });

export const loadModulesForApp = async (name: string) => {
  const [m, e] = await Promise.all([fetchModules, fetchEnvironment]);
  const modules = m as ModuleDefinition;
  const env = e as { [key: string]: any };

  (window as any).__gah__env = env;
  Object.keys(env).forEach(key => {
    environment[key] = env[key];
  });

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
