(function() {
    'use strict';

    angular
        .module('openprice.admin.stores')
        .config(moduleConfig);

    /* @ngInject */
    function moduleConfig($translatePartialLoaderProvider, $stateProvider, triMenuProvider) {
        $translatePartialLoaderProvider.addPart('app/manage-store');

        $stateProvider
        .state('triangular.admin-default.storeChain-list', {
            url: '/admin/storeChains',
            templateUrl: 'app/manage-store/list-storeChains.tmpl.html',
            controller: 'ListStoreChainsController',
            controllerAs: 'vm'
        })
        .state('triangular.admin-default.storeChain-detail', {
            url: '/admin/storeChains/:chainId',
            templateUrl: 'app/manage-store/display-storeChain.tmpl.html',
            controller: 'DisplayStoreChainController',
            controllerAs: 'vm'
        });

        triMenuProvider.addMenu({
            name: 'MENU.STORE-ADMIN.MODULE',
            icon: 'icon-list',
            type: 'dropdown',
            priority: 2.2,
            children: [{
                name: 'MENU.STORE-ADMIN.LIST-STORECHAIN-PAGE',
                state: 'triangular.admin-default.storeChain-list',
                type: 'link'
            }]
        });
    }
})();
