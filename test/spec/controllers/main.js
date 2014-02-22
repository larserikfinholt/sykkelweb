'use strict';

describe('Controller: MainCtrl', function () {

    // load the controller's module
    beforeEach(module('sykkelwebApp'));

    var MainCtrl,
        scope,
        tripService,
        defered,
        tmp
    ;


    // Initialize the controller and a mock scope
    beforeEach(inject(function ( $controller, $rootScope, $q) {
        tmp = $rootScope;
        scope = $rootScope.$new();
        tripDataService = {
            getLatest: function () {
                defered = $q.defer();
                return defered.promise;
            }
        };
        MainCtrl = $controller('MainCtrl', {
            $scope: scope,
            TripDataService: tripDataService
        });
    }));

    it('should show a list of the last trips on the front page', function () {
        expect(scope.trips).toBeUndefined();
        defered.resolve([{}, {}, {}]);
        tmp.$apply();
        expect(scope.trips.length).toBe(3);
    });
});
 