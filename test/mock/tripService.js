'use strict';

angular.module('sykkelwebApp')
    .factory('TripDataService', function ($http, $q) {

        var activeTrip = null; 

        return {
            startNew: function (name, email, phone) {
                var deferred = $q.defer();
                console.log('StartNew', name, email, phone);
                $http({
                    method: 'POST',
                    url: '/api/trips/start',
                    data: { name: name, email: email, phone: phone }
                }).success(function (d) {
                    console.log('Successfully started trip', d);
                    activeTrip = d;
                    activeTrip.id = d._id;
                    deferred.resolve(d);
                }).error(function (e) {
                    console.log('Error starting trip', e);
                    activeTrip = null;
                    deferred.reject(e);
                });
                return deferred.promise;
            },
            addPosition: function (lat, lng) {
                if (!activeTrip) {
                    var deferred = $q.defer();
                    deferred.reject('No active trip');
                    return deferred.promise;
                }
                return $http({
                    method: 'POST',
                    url: '/api/trips/addposition',
                    data: { tripId: activeTrip.id, lat: lat, lng: lng }
                });

            },
            stop: function () {
                var deferred = $q.defer();
                if (!activeTrip) {
                    deferred.reject('No active trip');
                } else {

                    $http({
                        method: 'POST',
                        url: '/api/trips/stop',
                        data: { tripId: activeTrip.id }
                    }).success(function (d) {
                        console.log('Trip successfully stopped', d);
                        activeTrip = null;
                        deferred.resolve(d);
                    }).error(function (e) {
                        console.log('Error stopping trip', e);
                        activeTrip = null;
                        deferred.reject(e);
                    });
                }
                return deferred.promise;
            },
            getById: function (tripId) {
                return $http({
                    method: 'GET',
                    url: '/api/trips/',
                    data: { id: tripId }
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
