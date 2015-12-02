(function() {
    'use strict';

    angular
        .module('openprice.admin.stores')
        .controller('DisplayStoreChainController', DisplayStoreChainController);

    /* @ngInject */
    function DisplayStoreChainController($q, $stateParams, adminService, FileUploader, tokenStorage) {
        var vm = this;
        vm.storeChain = {};
        vm.storeBranches = [];
        vm.branchPage = {};
        vm.branchPageChanged = branchPageChanged;
        vm.catalogs = [];
        vm.catalogPage = {};
        vm.catalogPageChanged = catalogPageChanged;
        vm.uploader = new FileUploader({
            headers : {'X-AUTH-TOKEN' : tokenStorage.retrieve()}
        });
        vm.uploadFile = uploadFile;

        adminService.getAdminResource()
        .then( function(resource) {
            return resource.$get('chain', {'chainId': $stateParams.chainId});
        })
        .then( function(storeChain)
        {
            vm.storeChain = storeChain;
            vm.uploader.url = vm.storeChain.catalogUploadUrl;

            loadBranches(0, 10);
            loadCatalogs(0, 10);
        })
        ;

        vm.uploader.onSuccessItem = function(item, response, status, headers) {
            console.log("Successfully uploaded "+item.file.name);
            loadCatalogs(0, 10);
        }

        function loadBranches( pageNumber, size ) {
            vm.storeChain.$get('branches', {'page': pageNumber, 'size':size, 'sort':null})
            .then( function(branches)
            {
                vm.branchPage = branches.page;
                vm.branchPage.currentPage = branches.page.number + 1;
                if (branches.$has('branches')) {
                    return branches.$get('branches');
                }
                vm.storeBranches = [];
                return $q.reject("no branches!");
            })
            .then( function(branchList)
            {
                vm.storeBranches = branchList;
            })
            ;
        };

        function branchPageChanged(page, limit) {
            loadBranches(page-1, limit); //Spring HATEOAS page starts with 0
        };

        function loadCatalogs( pageNumber, size ) {
            vm.storeChain.$get('catalogs', {'page': pageNumber, 'size':size, 'sort':null})
            .then( function(catalogs)
            {
                vm.catalogPage = catalogs.page;
                vm.catalogPage.currentPage = catalogs.page.number + 1;
                if (catalogs.$has('catalogs')) {
                    return catalogs.$get('catalogs');
                }
                vm.catalogs = [];
                return $q.reject("no catalogs!");
            })
            .then( function(catalogList)
            {
                vm.catalogs = catalogList;
            })
            ;
        };

        function catalogPageChanged(page, limit) {
            loadCatalogs(page-1, limit); //Spring HATEOAS page starts with 0
        };

        function uploadFile(item) {
            //console.log("upload "+item.file.name);
            item.upload();
        }
    }
})();
