(function() {
    'use strict';

    angular
        .module('openprice.admin', [
            'triangular',
            'ngAnimate', 'ngCookies', 'ngTouch', 'ngSanitize', 'ngMessages', 'ngMaterial',
            'ui.router', 'pascalprecht.translate', 'LocalStorageModule', 'googlechart',
            'chart.js', 'linkify', 'ui.calendar', 'angularMoment', 'textAngular',
            'uiGmapgoogle-maps', 'hljs', 'md.data.table',
            'angular-hal',
            // 'seed-module'
            // uncomment above to activate the example seed module
            //'app.examples'
            'openprice.common',
            'openprice.authentication',
            'openprice.dashboards',
            'openprice.admin.users',
            'openprice.admin.receipts'
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
        // set a constant for the API we are connecting to
        .constant('API_CONFIG', {
            'url':  'http://104.197.105.245:7801/'
        });
})();
