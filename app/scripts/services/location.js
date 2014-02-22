'use strict';

angular.module('sykkelwebApp')
    .factory('LocationService', function ($http, $q, $rootScope) {

        var watchId = -1;
        

        return {
            canGetPosition: function(){
                return this.getPosition();
            },
            getPosition: function () {
                var options = {
                    enableHighAccuracy: true,
                    timeout: 5000,
                    maximumAge: 0
                };
                var def = $q.defer();
                console.log('navigator.geolocation.getCurrentPosition');
                navigator.geolocation.getCurrentPosition(
                    function (d) {
                        console.log('got position', d);
                        def.resolve(d);
                    }, function (e) {
                        console.log('error getting position', e);
                        def.reject(e);
                    }, options);
                return def.promise;
            },
            stop: function(){
                if (watchId!=-1){
                    console.log('navigator.geolocation.getCurrentPosition-' + watchId);
                    navigator.geolocation.clearWatch(watchId);
                    watchId=null;
                } else {
                    console.log("No need to stop...");
                }
            },
            start: function (onChange) {
                var options = {
                    enableHighAccuracy: true,
                    timeout: 5000,
                    maximumAge: 3000
                };
                var lastSuccess = null;

                var defer = $q.defer();
                this.getPosition().then(function () {

                    console.log('navigator.geolocation.watchPosition')
                    watchId = navigator.geolocation.watchPosition(function (d) {
                        $rootScope.$apply(function () {
                            onChange(d);
                        });
                    }, function (e) {
                        $rootScope.$apply(function () {
                            onChange(e);
                        });
                    }, options);
                    console.log('Location service started (id:'+watchId+'). Waiting for position change...');
                    defer.resolve();
                }, function (e) {
                    console.log("Could not start becouse no position found", e);
                    defer.reject();
                })
                return defer.promise;

            }
    };
});
