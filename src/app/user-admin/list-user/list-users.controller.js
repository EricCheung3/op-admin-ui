(function() {
    'use strict';

    angular
        .module('openprice.admin.users')
        .controller('ListUsersController', ListUsersController);

    /* @ngInject */
    ListUsersController.$inject = ['adminService', '$mdDialog', '$scope', '$state'];
    function ListUsersController(   adminService ,  $mdDialog ,  $scope,   $state) {
        var vm = this;
        vm.users = [];
        vm.page = {};
        vm.setup = setup;
        vm.pageChanged = pageChanged;
        vm.update = update;

        setup(0, 10);

        function setup( pageNumber, size) {
            adminService.getAdminResource()
            .then( function(resource) {
                return resource.$get('users', {'page': pageNumber, 'size':size, 'sort':null});
            })
            .then( function(users){
                vm.page = users.page;
                vm.page.currentPage = vm.page.number + 1;
                if (users.$has('userAccounts')) {
                    return users.$get('userAccounts');
                }
                vm.users = [];
                return $q.reject("no users!");
            })
            .then( function(userList){
                vm.users = userList;
            });
        };

        function pageChanged(page, limit) {
            console.log('page changed to '+page + ', limit with '+limit)
            setup(page-1, limit); //Spring HATEOAS page starts with 0
        };
        function update(userId){
            $state.go('triangular.admin-default.update-user-profile',{userId:userId});
        };

    };
})();
