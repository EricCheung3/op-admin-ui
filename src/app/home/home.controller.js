(function() {
'use strict';

    angular
        .module('openprice.admin')
        .controller('HomeController', HomeController);

    /* @ngInject */
    function HomeController($log, $rootScope, $state, apiService ) {
        $log.debug('==> HomeController');

        loadCurrentSigninUser();

        function loadCurrentSigninUser() {
            apiService
                .getWebsiteResource()
                .then( function( websiteResource ) {
                    if (websiteResource.authenticated) {
                        $log.debug("already logged in, go to dashboard");
                        $rootScope.authenticated = true;
                        $rootScope.currentUser = websiteResource.currentUser;
                        $state.go("admin.dashboard");
                    } else {
                        $rootScope.authenticated = false;
                        $rootScope.currentUser = null;
                        $state.go("authentication.login");
                        $log.debug("redirect to login");
                    }
                });
        };

    };

})();
