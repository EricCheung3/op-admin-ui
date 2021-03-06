(function() {
'use strict';

    angular
        .module('openprice.admin')
        .controller('StartController', StartController);

    /* @ngInject */
    function StartController($log, $rootScope, $state, adminService ) {
        $log.debug('==> StartController');

        loadCurrentSigninUser();

        function loadCurrentSigninUser() {
            adminService
                .getAdminResource()
                .then( function( resource ) {
                    if (resource === null) {
                        $log.debug("Not logged in, go to login page");
                        $state.go("authentication.login");
                    } else {
                        $log.debug("already logged in, go to dashboard");
                        $rootScope.currentUser = resource;
                        $state.go("triangular.admin-default.dashboard-general");
                    }
                });
        };

    };

})();
