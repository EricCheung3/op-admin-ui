(function() {
    'use strict';

    angular
        .module('openprice.authentication')
        .controller('LoginController', LoginController);

    /* @ngInject */
    function LoginController($log, $scope,  $state, triSettings, apiService) {
        var vm = this;
        vm.loginClick = loginClick;
        vm.socialLogins = [{
            icon: 'fa fa-twitter',
            color: '#5bc0de',
            url: '#'
        },{
            icon: 'fa fa-facebook',
            color: '#337ab7',
            url: '#'
        },{
            icon: 'fa fa-google-plus',
            color: '#e05d6f',
            url: '#'
        },{
            icon: 'fa fa-linkedin',
            color: '#337ab7',
            url: '#'
        }];
        vm.triSettings = triSettings;
        // create blank user variable for login form
        vm.user = {
            username: '',
            password: ''
        };

        ////////////////

        function loginClick() {
            apiService.authenticate(vm.user, function(authenticated) {
                if (authenticated) {
                    $log.debug('Login succeeded')
                    $scope.error = false;
                    $state.go('triangular.admin-default.dashboard-general');
                } else {
                    $log.debug('Login failed')
                    $scope.error = true; //TODO display error messages
                }
            });
        }
    }
})();
