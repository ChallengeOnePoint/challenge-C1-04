import angular from 'angular';

class ListController {
  constructor () {
    // stuff
  }
}

export default angular
  .module('addressBook.states.list', [])
  .constant('ListState', {
    controller: ListController,
    templateUrl: ""
  });
