(function() {
    'use strict';

    angular
        .module('openprice.admin.receipts')
        .config(moduleConfig);

    /* @ngInject */
    function moduleConfig($translatePartialLoaderProvider, $stateProvider, triMenuProvider) {
        $translatePartialLoaderProvider.addPart('app/manage-receipt');

        $stateProvider
        .state('triangular.admin-default.receipt-list', {
            url: '/admin/receipts',
            templateUrl: 'app/manage-receipt/list-receipts.tmpl.html',
            // set the controller to load for this page
            controller: 'ListReceiptsController',
            controllerAs: 'vm'
        });

        triMenuProvider.addMenu({
            name: 'MENU.RECEIPT-ADMIN.MODULE',
            icon: 'icon-grade',
            type: 'dropdown',
            priority: 2.2,
            children: [{
                name: 'MENU.RECEIPT-ADMIN.LIST-RECEIPT-PAGE',
                state: 'triangular.admin-default.receipt-list',
                type: 'link'
            }]
        });
    }
})();
