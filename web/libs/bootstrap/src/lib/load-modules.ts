import { loadRemoteModule } from '@angular-architects/module-federation';
import { Environment, environment } from './environment';

export type ModuleDefinition = { name: string; ngModuleName: string; url: string }[];
export const loadedModules: any[] = [];

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

export const loadModulesForApp = async () => {
  const [m, e] = await Promise.all([fetchModules, fetchEnvironment]);
  const modules = m as ModuleDefinition;
  const env = e as Environment;

  if (env) {
    if (!env.production) {
      (window as any).__gah__env = env;
    }
    Object.keys(env).forEach(key => {
      environment[key] = env[key];
    });
  }

  if (modules.length === 0) {
    return;
  }

  await Promise.all(
    modules.map(moduleToLoad => {
      return loadRemoteModule({
        exposedModule: './Module',
        remoteEntry: moduleToLoad.url + 'remoteEntry.js',
        type: 'module'
      }).then(loadedModule => {
        loadedModules.push(loadedModule[moduleToLoad.ngModuleName]);
      });
    })
  );
};
