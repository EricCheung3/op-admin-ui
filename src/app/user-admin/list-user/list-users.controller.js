(function() {
    'use strict';

    angular
        .module('openprice.admin.users')
        .controller('ListUsersController', ListUsersController);

    /* @ngInject */
    ListUsersController.$inject = ['adminService', '$mdDialog', '$scope'];
    function ListUsersController(   adminService ,  $mdDialog ,  $scope) {
        var vm = this;
        vm.users = [];
        vm.page = {};
        vm.setup = setup;
        vm.pageChanged = pageChanged;
        vm.update = update;
        vm.userProfile = null;
        setup(0);

        function setup( pageNumber ) {
            adminService.getAdminResource()
            .then( function(resource) {
                return resource.$get('users', {'page': pageNumber, 'size':10, 'sort':null});
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

        function pageChanged() {
            setup(vm.page.currentPage - 1); //Spring HATEOAS page starts with 0
        };

        function update(index){
            $mdDialog.show({
                controller: UpdateController,
                templateUrl: 'app/user-admin/update-user/update-users.html',
                parent: angular.element(document.body),
                targetEvent: index,
                clickOutsideToClose:true,
                locals: {
                    userProfile: vm.users[index]
                }
            })
            .then(function(answer) {
                console.log("update success", answer);
            }, function(error) {
                console.log("update error", error);
            });

        };


    } // end of ListUsersController

    function UpdateController($scope, $mdDialog, userProfile) {
        $scope.userProfile = userProfile;

        $scope.submit = function() {
            console.log("submit" ,$scope.userProfile);


            $mdDialog.hide();
        };

        $scope.cancel = function() {
            $mdDialog.cancel();
        };
    }


})();
