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
                templateUrl: 'app/start/start.tmpl.html',
                controller : 'StartController',
                controllerAs : 'vm'
            })
            ;

	};

})();
