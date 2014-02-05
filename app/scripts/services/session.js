'use strict';

angular.module('sykkelwebApp')
  .factory('Session', function ($resource) {
    return $resource('/api/session/');
  });
