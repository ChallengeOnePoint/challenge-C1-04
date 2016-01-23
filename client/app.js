import angular from 'angular';
import directives from './directives';
import states from './states';
import resources from './resources';
import 'angular-ui-router';

angular
  .module('addressBook', [
    'ui.router',
    directives.name,
    states.name,
    resources.name,
  ])
  .config(routes);

const STATES = {
  list: 'ListState',
};

/* @ngInject */
function routes ($injector, $stateProvider, $urlRouterProvider) {
  angular.forEach(STATES, (constant, name) => {
    $stateProvider.state(name, $injector.get(constant));
  });

  $urlRouterProvider.otherwise("/");
}
