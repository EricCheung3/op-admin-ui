(function() {
    'use strict';

    angular
        .module('openprice.admin')
        .config(securityConfig);

    /* @ngInject */
    function securityConfig($httpProvider) {
        $httpProvider.interceptors.push('tokenAuthInterceptor');
    }
})();
