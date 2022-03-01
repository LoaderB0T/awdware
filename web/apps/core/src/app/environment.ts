export const defaultEnvironment = {
  production: false,
  apiUrl: ''
};

export const environment: typeof defaultEnvironment = (window as any).__gah__env;

export const envValidator = () => {
  if (!environment) {
    console.error('Environment is not defined');
  }
  (Object.keys(defaultEnvironment) as (keyof typeof defaultEnvironment)[]).forEach(key => {
    if (!environment[key]) {
      console.error(`Environment is missing '${key}'`);
    }
  });
};
