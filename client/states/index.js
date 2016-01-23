import angular from 'angular';
import list from './list';

export default angular
  .module('addressBook.states', [
    list.name,
  ]);
