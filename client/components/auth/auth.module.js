'use strict';

angular.module('newCustomCrmApp.auth', ['newCustomCrmApp.constants', 'newCustomCrmApp.util',
    'ngCookies', 'ui.router'
  ])
  .config(function($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
  });
