(function() {
    'use strict';

    angular
        .module('openprice.admin.receipts')
        .controller('DisplayReceiptDetailController', DisplayReceiptDetailController)
        .filter('split', function() {
            return function(input, splitChar) {
                //useage: {{input | split:'\n':0}}
                return input.split(splitChar);
            }
        })
        ;

    /* @ngInject */
    function DisplayReceiptDetailController($q, $stateParams, adminService, $state) {
        var vm = this;
        vm.receipt = {};

        vm.result = {};

        adminService.getAdminResource()
        .then( function(resource) {
            return resource.$get('receipt', {'receiptId': $stateParams.receiptId});
        })
        .then( function(receipt){
            vm.receipt = receipt;
            return receipt.$get('receiptImages');
        })
        .then( function(images){
            vm.receipt.images = images;

            loadReceiptResults(0, 10);
        })
        ;

        function loadReceiptResults( pageNumber, size ) {
            vm.receipt.$get('results', {'page': pageNumber, 'size':size, 'sort':null})
            .then( function(results){
                vm.resultPage = results.page;
                vm.resultPage.currentPage = results.page.number + 1;
                if (results.$has('receiptResults')) {
                    return results.$get('receiptResults');
                }
                vm.receipt.results = [];
                return $q.reject('no results!');
            })
            .then( function(resultList){
                vm.receipt.results = resultList;
                resultList.forEach( function(result){
                    result.$get('items', {'page': 0, 'size':100, 'sort':null})
                    .then( function (items){
                        if (items.$has('receiptItems')) {
                            return items.$get('receiptItems');
                        }
                        result.receiptItems = [];
                        return $q.reject('no items!');
                    })
                    .then( function(itemList){
                        result.receiptItems = itemList;
                    })
                });
            })
            .then(function () {
                vm.result = vm.receipt.results[$stateParams.index];
                vm.ocrResult = vm.receipt.images[$stateParams.index].ocrResult.split('\n');
                // console.log("result", vm.ocrResult);
            })
            ;
        };

        function resultPageChanged(page, limit) {
            loadReceiptResults(page-1, limit); //Spring HATEOAS page starts with 0
        };

    }
})();
