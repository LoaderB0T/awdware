import('ng-dynamic-mf')
  .then(x => x.initializeApp('loadEnvironment'))
  .then(() => {
    import('./bootstrap').catch(err => console.error(err));
  });
