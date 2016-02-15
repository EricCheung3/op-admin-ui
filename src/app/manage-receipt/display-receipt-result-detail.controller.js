(function() {
    'use strict';

    angular
        .module('openprice.admin.receipts')
        .controller('DisplayReceiptDetailController', DisplayReceiptDetailController)
        .filter('split', function() {
            return function(input, splitChar) {
                //useage: {{input | split:'\n'}}
                return input.split(splitChar);
            }
        })
        ;

    /* @ngInject */
    function DisplayReceiptDetailController($q, $stateParams, adminService, $state) {
        var vm = this;
        vm.receipt = {};
        vm.ocrResults = [];

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
            images.forEach(function(image) {
              vm.ocrResults = vm.ocrResults.concat(image.ocrResult.split('\n'));
            });
            loadReceiptResults(0, 10);
        });

        function loadReceiptResults( pageNumber, size ) {
            vm.receipt.$get('result',{'resultId': $stateParams.resultId})
            .then(function(result) {
                vm.receipt.result = result;
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
            })
            .then(function () {
                vm.receipt.result.$get('receiptItems')
                .then(function(items) {
                  joinWith(vm.ocrResults, vm.receipt.result.receiptFields, items);
                });
            });
        };

        function joinWith(ocrResults, fields, items) {
          for(var field in fields) {
            for(var line in ocrResults) {
               if(line == fields[field].lineNumber){
                  var parseResult = {};
                  parseResult.ocrResult = ocrResults[line];
                  parseResult.field = fields[field];
                  ocrResults[line] = parseResult;
                  // console.log("ocrResults[line]",ocrResults[line]);
               }
            }
          }
          for(var item in items){
            for(var line in ocrResults) {
               if(line == items[item].lineNumber){
                  var parseResult = {};
                  parseResult.ocrResult = ocrResults[line];
                  parseResult.item = items[item];
                  ocrResults[line] = parseResult;
               }
            }
          }
        };

        function resultPageChanged(page, limit) {
            loadReceiptResults(page-1, limit); //Spring HATEOAS page starts with 0
        };

    }
})();
