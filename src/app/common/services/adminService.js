(function () {
'use strict';

    angular
        .module('openprice.common')
        .factory('adminService', adminService);

    /* @ngInject */
    function adminService($log, $rootScope, $http, halClient, tokenStorage) {
        var serverHost;
        var adminResource = null;

        return {
            'init' : init,
            'authenticate' : authenticate,
            'clear' : clear,
            'reload' : reload,
            'getResource' : getResource,
            'getAdminResource' : getAdminResource
        };

        function init(host) {
            serverHost = host;
        };

        function authenticate(credentials, callback) {
            $log.debug('adminService.authenticate() for '+credentials.username);

            $http.post(serverHost + '/api/signin', credentials)
                .success( function(data, status, headers){
                    tokenStorage.store(headers('X-AUTH-TOKEN'));
                    reload(); // refresh websiteResource after login
                    callback && callback(true);
                })
                .error( function() {
                    $rootScope.authenticated = false;
                    callback && callback(false);
                });
        };

        function clear() {
            $rootScope.authenticated = false;
            $rootScope.currentUser = null;
            tokenStorage.clear();
        };

        function reload() {
            $log.debug('==>Reload adminResource...');
            adminResource =
                halClient
                    .$get(serverHost + '/api/admin/')
                    .then( function( resource ) {
                        $rootScope.authenticated = true;
                        $rootScope.currentUser = resource;
                        return resource;
                    }, function( err ) {
                        $log.warn('Reload adminResource error ');
                        $log.warn(err);
                        $rootScope.authenticated = false;
                        $rootScope.currentUser = null;
                        return null;
                    });
        };

        function getResource(resourceUrl) {
            return halClient.$get(resourceUrl);
        };


        function getAdminResource() {
            if (adminResource == null) {
                reload();
            }
            return adminResource;
        };

    };
})();
