(function() {
    'use strict';

    angular
        .module('openprice.admin.users')
        .controller('ListUsersController', ListUsersController);

    /* @ngInject */
    function ListUsersController(apiService) {
        var vm = this;
        vm.users = [];
        vm.page = {};
        vm.setup = setup;
        vm.pageChanged = pageChanged;

        setup(0);

        function setup( pageNumber ) {
            apiService.getAdminResource()
            .then( function(resource) {
                return resource.$get('users', {'page': pageNumber, 'size':10, 'sort':null});
            })
            .then( function(users)
            {
                vm.page = users.page;
                vm.page.currentPage = vm.page.number + 1;
                if (users.$has('userAccounts')) {
                    return users.$get('userAccounts');
                }
                vm.users = [];
                return $q.reject("no users!");
            })
            .then( function(userList)
            {
                vm.users = userList;
            })
            ;

        };

        function pageChanged() {
            setup(vm.page.currentPage - 1); //Spring HATEOAS page starts with 0
        };

    }
})();
