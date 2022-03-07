import('ng-dynamic-mf')
  .then(x => x.initializeApp())
  .then(() => {
    import('./bootstrap').catch(err => console.error(err));
  });
