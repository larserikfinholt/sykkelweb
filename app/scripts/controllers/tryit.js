'use strict';

angular.module('sykkelwebApp')
  .controller('TryitCtrl', function ($scope, TripService) {
      $scope.status = "click to start";
      $scope.start = function () {
          TripService.startNew($scope.currentUser.name, $scope.currentUser.email, $scope.currentUser.phone)
              .then(function (d) {
                  $scope.status = "Started " + d.id;
              },function(e){
                  $scope.status = "Error during starting " + e;
              });
      };
      $scope.stop = function () {
          TripService.stop()
              .then(function (d) {
                  $scope.status = "Stopped";
              }, function (e) {
                  $scope.status = "Error during starting " + e;
              });
      };

      $scope.addPosition = function (lat, lng) {
          TripService.addPosition(lat, lng)
              .then(function (d) {
                  $scope.status = "Added new position" + lat + "," + lng;
                  $scope.positions.push({ lat: lat, lng: lng, saved: true, time: new Date() });
              }, function (e) {
                  $scope.status = "Error during add position " + e;
              });
      };
      $scope.currentUser = { name: "User1", phone: "95271895", email: "lars.erik.finholt@gmail.com" };
      $scope.positions = [];

      $scope.saveSettings = function () { $scope.userSet = !$scope.userSet; }
      $scope.userSet = true;

  });
