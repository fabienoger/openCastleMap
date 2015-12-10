Package.describe({
  name: 'fabienoger:leaflet-1',
  version: '0.0.1',
  // Brief, one-line summary of the package.
  summary: 'This package allows to operate the markers clusters leaflet',
  // URL to the Git repository containing the source code for this package.
  git: 'https://github.com/fabienoger/openCastleMap',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: null
});

Package.onUse(function(api) {
  api.versionsFrom('1.2.1');
  api.use('ecmascript');
  api.use('bevanhunt:leaflet@0.3.14');
  api.addFiles('leaflet-1.js', ['client']);
  api.addFiles('leaflet-1.css', ['client']);
});
