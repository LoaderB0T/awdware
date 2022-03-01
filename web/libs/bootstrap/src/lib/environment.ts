export type Environment = {
  production: boolean;
  [key: string]: any;
};

export const environment: Environment = { production: false };

export const envValidator = (defaultEnvironment: Environment) => {
  if (!environment) {
    console.error('Environment is not defined');
  }
  (Object.keys(defaultEnvironment) as (keyof typeof defaultEnvironment)[]).forEach(key => {
    if (!environment[key]) {
      console.error(`Environment is missing '${key}'`);
    }
  });
};
