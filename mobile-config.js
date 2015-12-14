App.info({
  id: 'opencastlemap.fabienoger.com',
  name: 'OpenCastleMap',
  description: 'All french castle',
  author: 'Fabien Oger',
  email: 'contact@fabienoger.com',
  website: 'http://fabienoger.com'
});

App.accessRule('http://*.tile.openstreetmap.org/*');
App.accessRule('https://maxcdn.bootstrapcdn.com/*');
App.accessRule('*');
