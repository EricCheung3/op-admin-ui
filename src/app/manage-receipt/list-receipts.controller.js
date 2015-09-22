(function() {
    'use strict';

    angular
        .module('openprice.admin.receipts')
        .controller('ListReceiptsController', ListReceiptsController);

    /* @ngInject */
    function ListReceiptsController(adminService) {
        var vm = this;
        vm.receipts = [];
        vm.page = {};
        vm.setup = setup;
        vm.pageChanged = pageChanged;

        setup(0);

        function setup( pageNumber ) {
            adminService.getAdminResource()
            .then( function(resource) {
                return resource.$get('receipts', {'page': pageNumber, 'size':10, 'sort':null});
            })
            .then( function(receipts)
            {
                vm.page = receipts.page;
                vm.page.currentPage = vm.page.number + 1;
                if (receipts.$has('receipts')) {
                    return receipts.$get('receipts');
                }
                vm.receipts = [];
                return $q.reject("no receipts!");
            })
            .then( function(receiptList)
            {
                vm.receipts = receiptList;
            })
            ;

        };

        function pageChanged() {
            console.log("page changed to "+vm.page.currentPage)
            setup(vm.page.currentPage - 1); //Spring HATEOAS page starts with 0
        };

    }
})();
