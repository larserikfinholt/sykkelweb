'use strict';

angular.module('sykkelwebApp')
  .controller('MainCtrl', function ($scope, TripService, $http) {
      $scope.start = function () {
          TripService.startNew('jalla', 'balla', 'ddd').success(function (d) {
              console.log("Started", d);
          });
      }
      $http.get('/api/awesomeThings').success(function (awesomeThings) {
          $scope.awesomeThings = awesomeThings;
      });
      TripService.getLatest().success(function (trips) {
          //$http.get('/api/trips').success(function (trips) {
          $scope.trips = trips;
      });

  });
