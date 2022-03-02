import('@awdware/bootstrap')
  .then(x => x.initializeApp())
  .then(() => {
    import('./bootstrap').catch(err => console.error(err));
  });
