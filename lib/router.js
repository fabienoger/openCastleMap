Router.configure({
  layoutTemplate: 'layout'
});

// Templates
Router.route('/', {name: 'home'});
Router.route('/map', {name: 'map'});
