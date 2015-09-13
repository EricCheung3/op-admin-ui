(function() {
'use strict';

	angular
	    .module('openprice.admin')
	    .config(config);

  	/* @ngInject */
	function config($stateProvider, $urlRouterProvider) {

		$stateProvider
            .state('home', {
                url: '/',
                templateUrl: 'app/home/home.tmpl.html',
                controller : 'HomeController',
                controllerAs : 'vm'
            })
            ;

	};

})();
