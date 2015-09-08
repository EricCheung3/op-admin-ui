
(function() {
    'use strict';

    angular
        .module('openprice.admin')
        .value('googleChartApiConfig', {
            version: '1.1',
            optionalSettings: {
                packages: ['line', 'bar', 'geochart', 'scatter'],
                language: 'en'
            }
        });
})();
