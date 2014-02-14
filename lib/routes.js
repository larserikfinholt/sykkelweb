'use strict';

var api = require('./controllers/api'),
    index = require('./controllers'),
    trips = require('./controllers/trips'),
    users = require('./controllers/users'),
    session = require('./controllers/session');

var middleware = require('./middleware');

/**
 * Application routes
 */
module.exports = function(app) {

  // Server API Routes
  app.get('/api/awesomeThings', api.awesomeThings);
  
  app.post('/api/users', users.create);
  app.put('/api/users', users.changePassword);
  app.get('/api/users/me', users.me);
  app.get('/api/users/:id', users.show);

  app.post('/api/session', session.login);
  app.del('/api/session', session.logout);

  app.post('/api/trips/start', trips.startNew);
  app.post('/api/trips/stop', trips.stop);
  app.post('/api/trips/addposition', trips.addPosition);
  app.get('/api/trips/latest', trips.latest);
  app.get('/api/trips/:id', trips.get);


  // All other routes to use Angular routing in app/scripts/app.js
  app.get('/partials/*', index.partials);
  app.get('/*', middleware.setUserCookie, index.index);
};