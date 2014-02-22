'use strict';

describe('Controller: TryitCtrl', function () {

    // load the controller's module
    beforeEach(module('sykkelwebApp'));

    var TryitCtrl,
        scope;

    // Initialize the controller and a mock scope
    beforeEach(inject(function ($controller, $rootScope) {
        
        scope = $rootScope.$new();
        TryitCtrl = $controller('TryitCtrl', {
            $scope: scope
        });
    }));

    it('should attach a list of awesomeThings to the scope', function () {
        expect(scope.status).toBe('click to start');
    });
});
