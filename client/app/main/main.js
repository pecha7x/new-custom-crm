'use strict';

angular.module('newCustomCrmApp')
  .config(function($stateProvider) {
    $stateProvider.state('main', {
      url: '/',
      template: '<main></main>'
    });
  });
