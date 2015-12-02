(function() {
    'use strict';

    angular
        .module('openprice.admin')
        .run(run);

    /* @ngInject */
    function run($rootScope, $state, $stateParams, adminService, EnvironmentConfig) {
        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;

        console.log(EnvironmentConfig.api);
        adminService.init(EnvironmentConfig.api);

        $rootScope.logout = function() {
            adminService.clear();
            $state.go('authentication.login');
        };
    };

})();
