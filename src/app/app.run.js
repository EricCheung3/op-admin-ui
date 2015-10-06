(function() {
    'use strict';

    angular
        .module('openprice.admin')
        .run(run);

    /* @ngInject */
    function run($rootScope, $state, $stateParams, adminService) {
        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;

        adminService.init('http://104.197.105.245:7801');

        $rootScope.logout = function() {
            adminService.clear();
            $state.go('authentication.login');
        };
    };

})();
