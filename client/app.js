import angular from 'angular';
import directives from './directives';
import 'angular-ui-router';

/* @ngInject */
angular.module('addressBook', [
  directives.name,
  'ui.router'
])
  /* @ngInject */
  .config(($stateProvider, $urlRouterProvider) => {
    $urlRouterProvider.otherwise("/");

    $stateProvider
      .state('state1', {
        url: "/state1",
        templateUrl: "home.html"
      });
  });


