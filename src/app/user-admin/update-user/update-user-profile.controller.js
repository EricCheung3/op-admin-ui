(function() {
    'use strict';

    angular
        .module('openprice.admin.users')
        .controller('UpdateUserController', UpdateUserController);

    /* @ngInject */
    UpdateUserController.$inject = ['adminService', '$scope', '$http', '$state', '$stateParams'];
    function UpdateUserController(   adminService,   $scope,   $http,   $state,   $stateParams) {
        var vm = this;
        vm.user = null;
        vm.userProfile = null;
        vm.updateProfile = {};
        vm.submit = submit;
        vm,cancel = cancel;

        adminService.getAdminResource()
        .then(function(resource) {
            return resource.$get('user', {userId: $stateParams.userId});
        }).then(function(user){
            vm.user = user;
            return user.profile;
        }).then(function(profile) {
            vm.userProfile = profile;
        });

        function submit(){
            vm.updateProfile = {
              "firstName" : vm.userProfile.firstName,
              "middleName" : vm.userProfile.middleName,
              "lastName" : vm.userProfile.lastName,
              "phone" : vm.userProfile.phone,
              "displayName" : vm.userProfile.displayName,
              "address1" : vm.userProfile.address.address1,
              "address2" : vm.userProfile.address.address2,
              "city" : vm.userProfile.address.city,
              "state" : vm.userProfile.address.state,
              "zip" : vm.userProfile.address.zip,
              "country" : vm.userProfile.address.country
            };

            vm.user.$put("profile", {}, vm.updateProfile)
            .then(function(){
                $state.go('triangular.admin-default.user-list');
            });
        };

        function cancel() {
            $state.go('triangular.admin-default.user-list');
        };

    };
})();
