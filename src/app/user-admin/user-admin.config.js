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
        });

        triMenuProvider.addMenu({
            name: 'MENU.USER-ADMIN.MODULE',
            icon: 'icon-grade',
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
