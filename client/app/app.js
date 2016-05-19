'use strict';

angular.module('newCustomCrmApp', ['newCustomCrmApp.auth', 'newCustomCrmApp.admin',
    'newCustomCrmApp.constants', 'ngCookies', 'ngResource', 'ngSanitize', 'ui.router',
    'ui.bootstrap', 'validation.match'
  ])
  .config(function($urlRouterProvider, $locationProvider) {
    $urlRouterProvider.otherwise('/');

    $locationProvider.html5Mode(true);
  });
