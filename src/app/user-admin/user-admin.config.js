(function() {
    'use strict';

    angular
        .module('openprice.admin.users')
        .config(moduleConfig);

    /* @ngInject */
    function moduleConfig($translatePartialLoaderProvider, $stateProvider, triMenuProvider) {
        $translatePartialLoaderProvider.addPart('app/user-admin');

        $stateProvider
        .state('triangular.admin-default.user-list', {
            url: '/admin/users',
            templateUrl: 'app/user-admin/list-user/list-users.tmpl.html',
            // set the controller to load for this page
            controller: 'ListUsersController',
            controllerAs: 'vm'
        })
        .state('triangular.admin-default.update-user-profile', {
            url: '/admin/users/:userId',
            templateUrl: 'app/user-admin/update-user/update-user-profile.tmpl.html',
            // set the controller to load for this page
            controller: 'UpdateUserController',
            controllerAs: 'vm'
        });

        triMenuProvider.addMenu({
            name: 'MENU.USER-ADMIN.MODULE',
            icon: 'icon-people',
            type: 'dropdown',
            priority: 2.2,
            children: [{
                name: 'MENU.USER-ADMIN.LIST-USER-PAGE',
                state: 'triangular.admin-default.user-list',
                type: 'link'
            }]
        });
    }
})();
