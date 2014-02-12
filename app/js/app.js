'use strict';

// Declare app level module which depends on filters, and services
var app = angular.module('fifty', [
  'ngRoute',
  'fifty.filters',
  'fifty.services',
  'fifty.controllers'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/:type', {templateUrl:'partials/graph.html', controller:'HomeController'});
  $routeProvider.otherwise({redirectTo: '/daily'});
}]);

app.services = angular.module('fifty.services', []);
app.controllers = angular.module('fifty.controllers', []);
app.filters = angular.module('fifty.filters', []);