(function() {
    'use strict';

    angular
        .module('openprice.dashboards')
        .config(moduleConfig);

    /* @ngInject */
    function moduleConfig($translatePartialLoaderProvider, $stateProvider, triMenuProvider) {
        $translatePartialLoaderProvider.addPart('app/dashboards');

        $stateProvider
        .state('triangular.admin-default.dashboard-general', {
            url: '/dashboards/general',
            templateUrl: 'app/dashboards/dashboard-general.tmpl.html'
        })
        .state('triangular.admin-default.dashboard-analytics', {
            url: '/dashboards/analytics',
            templateUrl: 'app/dashboards/dashboard-analytics.tmpl.html',
            controller: 'DashboardAnalyticsController',
            controllerAs: 'vm'
        })
        .state('triangular.admin-default.dashboard-server', {
            url: '/dashboards/server',
            templateUrl: 'app/dashboards/dashboard-server.tmpl.html',
            controller: 'DashboardServerController',
            controllerAs: 'vm'
        })
        .state('triangular.admin-default.dashboard-widgets', {
            url: '/dashboards/widgets',
            templateUrl: 'app/dashboards/widgets.tmpl.html'
        })
        .state('triangular.admin-default.dashboard-social', {
            url: '/dashboards/social',
            templateUrl: 'app/dashboards/dashboard-social.tmpl.html',
            controller: 'DashboardSocialController',
            controllerAs: 'vm'
        });

        triMenuProvider.addMenu({
            name: 'MENU.DASHBOARDS.DASHBOARDS',
            icon: 'icon-home',
            type: 'dropdown',
            priority: 2.1,
            children: [{
                name: 'MENU.DASHBOARDS.ANALYTICS',
                state: 'triangular.admin-default.dashboard-analytics',
                type: 'link'
            },{
                name: 'MENU.DASHBOARDS.GENERAL',
                state: 'triangular.admin-default.dashboard-general',
                type: 'link'
            },{
                name: 'MENU.DASHBOARDS.SERVER',
                state: 'triangular.admin-default.dashboard-server',
                type: 'link'
            },{
                name: 'MENU.DASHBOARDS.WIDGETS',
                state: 'triangular.admin-default.dashboard-widgets',
                type: 'link'
            },{
                name: 'MENU.DASHBOARDS.SOCIAL',
                state: 'triangular.admin-default.dashboard-social',
                type: 'link'
            }]
        });

    }
})();
