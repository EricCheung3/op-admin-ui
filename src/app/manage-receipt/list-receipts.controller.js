(function() {
    'use strict';

    angular
        .module('openprice.admin.receipts')
        .controller('ListReceiptsController', ListReceiptsController);

    /* @ngInject */
    function ListReceiptsController($q, $state, adminService) {
        var vm = this;
        vm.receipts = [];
        vm.page = {};
        vm.showReceipt = showReceipt;
        vm.setup = setup;
        vm.pageChanged = pageChanged;

        setup(0, 10);

        function setup( pageNumber, size ) {
            adminService.getAdminResource()
            .then( function(resource) {
                return resource.$get('receipts', {'page': pageNumber, 'size':size, 'sort':null});
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
                console.log(receiptList);
                vm.receipts = receiptList;
            })
            ;

        };

        function pageChanged(page, limit) {
            console.log('page changed to '+page + ', limit with '+limit)
            setup(page-1, limit); //Spring HATEOAS page starts with 0
        };

        function showReceipt(receiptId) {
            $state.go('triangular.admin-default.receipt-result',{receiptId:receiptId});
        }
    }
})();
