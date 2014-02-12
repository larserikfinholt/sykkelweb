'use strict';

angular.module('sykkelwebApp')
  .factory('TripService', function ($http) {
      return {
          startNew: function (name, email, phone) {
              console.log("StartNew", name, email, phone);
              return $http({
                  method: 'POST',
                  url: '/api/trips/start',
                  data: { name: name, email: email, phone: phone }
              });
          },
          addPosition: function (tripId,lat, lng) {
              return $http({
                  method: 'POST',
                  url: '/api/trips/addposition',
                  data: { tripId: tripId, lat: lat, lng:lng  }
              });

          },
          stop: function (tripId) {
              return $http({
                  method: 'POST',
                  url: '/api/trips/stop',
                  data: { tripId: tripId }
              });

          },
          getById: function(tripId){
              return $http({
                  method: 'GET',
                  url: '/api/trips/',
                  data: {id: tripId}
              });

          },
          getLatest: function () {
              return $http({
                  method: 'GET',
                  url: '/api/trips/latest',
                  data: {}
              });

          }
      };
  });
