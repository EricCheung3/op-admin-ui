(function() {
    'use strict';

    angular
        .module('openprice.admin.stores')
        .controller('ListStoreChainsController', ListStoreChainsController);

    /* @ngInject */
    function ListStoreChainsController($q, $state, adminService) {
        var vm = this;
        vm.storeChains = [];
        vm.page = {};
        vm.showStoreChain = showStoreChain;
        vm.setup = setup;
        vm.pageChanged = pageChanged;

        setup(0, 10);

        function setup( pageNumber, size ) {
            adminService.getAdminResource()
            .then( function(resource) {

                return resource.$get('chains', {'page': pageNumber, 'size':size, 'sort':null});
            })
            .then( function(chains)
            {
                vm.page = chains.page;
                vm.page.currentPage = vm.page.number + 1;
                if (chains.$has('storeChains')) {
                    return chains.$get('storeChains');
                }
                vm.storeChains = [];
                return $q.reject("no store chains!");
            })
            .then( function(chainList)
            {
                vm.storeChains = chainList;
            })
            ;

        };

        function pageChanged(page, limit) {
            console.log('page changed to '+page + ', limit with '+limit)
            setup(page-1, limit); //Spring HATEOAS page starts with 0
        };

        function showStoreChain(chainId) {
            $state.go('triangular.admin-default.storeChain-detail',{chainId:chainId});
        }
    }
})();
