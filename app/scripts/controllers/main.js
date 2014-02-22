'use strict';

angular.module('sykkelwebApp')
    .controller('MainCtrl', function ($scope, TripDataService) {

        TripDataService.getLatest().then(function (trips) {
            $scope.trips = trips;
        });

    });
