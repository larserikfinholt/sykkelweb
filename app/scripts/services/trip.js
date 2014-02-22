'use strict';

angular.module('sykkelwebApp')
    .factory('TripService', function ($http, $q, TripDataService, LocationService) {

        var activeTrip = null;

        return {
            status: '',
            start: function (name, email, phone) {
                var deferred = $q.defer();
                // Create a new session

                // Watch all changes to position, process each change

                // Every 
                return deferred.promise;
            },
            stop: function () {
                var deferred = $q.defer();
                if (!activeTrip) {
                    deferred.reject('No active trip');
                } else {

                    return deferred.promise;
                }
            }
        };
    });
