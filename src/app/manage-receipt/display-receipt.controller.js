(function() {
    'use strict';

    angular
        .module('openprice.admin.receipts')
        .controller('DisplayReceiptController', DisplayReceiptController);

    /* @ngInject */
    function DisplayReceiptController($stateParams, adminService) {
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

            receipt.$get('items')
            .then( function(items) {
                vm.receipt.items = items;
            });
        })
        ;


    }
})();
