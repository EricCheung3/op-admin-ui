(function() {
    'use strict';

    angular
        .module('openprice.admin')
        .run(run);

    /* @ngInject */
    function run($rootScope, $state, $stateParams, adminService, API_CONFIG) {
        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;

        adminService.init(API_CONFIG.url);

        $rootScope.logout = function() {
            adminService.clear();
            $state.go('authentication.login');
        };
    };

})();
