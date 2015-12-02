(function() {
    'use strict';

    angular
        .module('openprice.admin.receipts')
        .controller('DisplayReceiptController', DisplayReceiptController);

    /* @ngInject */
    function DisplayReceiptController($q, $stateParams, adminService) {
        var vm = this;
        vm.receipt = {};
        vm.imageCache = [];


        adminService.getAdminResource()
        .then( function(resource) {
            return resource.$get('receipt', {'receiptId': $stateParams.receiptId});
        })
        .then( function(receipt)
        {
            vm.receipt = receipt;
            // add 'path' property to each image
            receipt.images.forEach( function(image) {
                adminService.getImageBase64Data(image._links.base64.href)
                .then( function(imageData) {
                    image.path = imageData;
                });
            });

            loadReceiptResults(0, 10);
        })
        ;

        function loadReceiptResults( pageNumber, size ) {
            vm.receipt.$get('results', {'page': pageNumber, 'size':size, 'sort':null})
            .then( function(results)
            {
                vm.resultPage = results.page;
                vm.resultPage.currentPage = results.page.number + 1;
                if (results.$has('receiptDatas')) {
                    return results.$get('receiptDatas');
                }
                vm.receipt.results = [];
                return $q.reject('no results!');
            })
            .then( function(resultList)
            {
                vm.receipt.results = resultList;
                resultList.forEach( function(result){
                    result.$get('items', {'page': 0, 'size':100, 'sort':null})
                    .then( function (items){
                        console.log("items "+items);
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
            ;
        };

        function resultPageChanged(page, limit) {
            loadReceiptResults(page-1, limit); //Spring HATEOAS page starts with 0
        };


    }
})();
