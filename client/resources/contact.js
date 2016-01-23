import angular from 'angular';

const CONTACT_URL  = '/api/contacts';

angular
  .module('addressBook.resources')
  .factory('Contact', contactFactory);

/* @ngInject */
function contactFactory ($resource) {
  return $resource(CONTACT_URL, { id: _id});
}
