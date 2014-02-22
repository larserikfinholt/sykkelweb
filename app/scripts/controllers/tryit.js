'use strict';

angular.module('sykkelwebApp')
    .controller('TryitCtrl', function ($scope, TripDataService, LocationService) {

        var processEvent = function (d) {
            console.log("Processing...", d);
            if (d.coords) {
                $scope.latestPosition = d;
                d.saved = false;
                $scope.positions.push(d);
                TripDataService.addPosition(d.coords.latitude, d.coords.longitude, d.timestamp).then(function () {
                    d.saved = true;
                });
            } else {
                $scope.latestError = d;
                $scope.latestError.timestamp = new Date();
            }
        };
        $scope.latestError = null;
        $scope.latestPosition = { coords: { latitude: 30, longitude: 30 } };

        $scope.zoom = 1;
        $scope.status = 'click to start';
        $scope.start = function () {
            // First, do a quick check to see if position is availible
            $scope.status = 'Trying to get position...';
            LocationService.canGetPosition().then(function () {
                // Then create a new session
                $scope.status = 'Creating session...';
                TripDataService.startNew($scope.currentUser.name, $scope.currentUser.email, $scope.currentUser.phone)
                    .then(function (d) {
                        // Then start watching position
                        $scope.status = 'Session created' + d.id;
                        LocationService.start(processEvent).then(function () {
                            $scope.status = 'Watching you...';
                            $scope.zoom = 14;
                        }, function () {
                            $scope.status = "Could not start watching.";
                        });
                    }, function (e) {
                        $scope.status = 'Unable to create session... ' + e;
                    });

            }, function () {
                $scope.status = 'Unable to get position, can not start';
            });

        };
        $scope.stop = function () {
            TripDataService.stop()
                .then(function () {
                    console.log("Successfully stopped")
                }, function (e) {
                    console.log('Error during stopping ' + e);
                });
            LocationService.stop();
            $scope.status = 'Stopped';
            $scope.latestError = null;
            $scope.latestPosition = null;
        };

        $scope.addPosition = function (lat, lng) {
            TripDataService.addPosition(lat, lng)
                .then(function () {
                    $scope.status = 'Added new position' + lat + ',' + lng;
                    $scope.positions.push({ lat: lat, lng: lng, saved: true, time: new Date() });
                }, function (e) {
                    $scope.status = 'Error during add position ' + e;
                });
        };
        $scope.currentUser = { name: 'User1', phone: '95271895', email: 'lars.erik.finholt@gmail.com' };
        $scope.positions = [];

        $scope.saveSettings = function () { $scope.userSet = !$scope.userSet; };
        $scope.userSet = true;

    });
