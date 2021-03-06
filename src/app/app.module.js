(function() {
    'use strict';

    angular
        .module('openprice.admin', [
            'triangular',
            'ngAnimate', 'ngCookies', 'ngTouch', 'ngSanitize', 'ngMessages', 'ngMaterial',
            'ui.router', 'pascalprecht.translate', 'LocalStorageModule', 'googlechart',
            'chart.js', 'linkify', 'ui.calendar', 'angularMoment', 'textAngular',
            'uiGmapgoogle-maps', 'hljs', 'md.data.table', 'angularFileUpload',
            'angular-hal',
            'openprice.common',
            'openprice.config',
            'openprice.authentication',
            'openprice.dashboards',
            'openprice.admin.users',
            'openprice.admin.receipts',
            'openprice.admin.stores'
        ])
        // create a constant for languages so they can be added to both triangular & translate
        .constant('APP_LANGUAGES', [{
            name: 'LANGUAGES.CHINESE',
            key: 'zh'
        },{
            name: 'LANGUAGES.ENGLISH',
            key: 'en'
        },{
            name: 'LANGUAGES.FRENCH',
            key: 'fr'
        },{
            name: 'LANGUAGES.PORTUGUESE',
            key: 'pt'
        }])
        ;
})();
