'use strict';

app.controllers.controller('HomeController', ['$scope', 'DataService', '$routeParams', function ($scope, DataService, $routeParams) {

	$scope.graphHeight = '350';
	$scope.graphWidth = '800';
	$scope.gap = 20;
	$scope.divider = 4;
	$scope.nbCharts = 0;

	$scope.items = [];

	if($routeParams.type === 'daily'){
		DataService.parse().then(function (result){
			$scope.nbCharts = result.data.length;
			$scope.chartWidth = ($scope.graphWidth / $scope.nbCharts) >> 2;
			$scope.items = result.data;
		});
	}
	else if($routeParams.type === 'weekly'){
		$scope.gap = 10;
		$scope.divider = 100;
		DataService.parse('w').then(function (result){
			$scope.nbCharts = result.data.length;
			$scope.chartWidth = ($scope.graphWidth / $scope.nbCharts) >> 2;
			$scope.items = result.data;
		});
	}

	$scope.onItemClick = function(item, e){
		e.preventDefault();
	};

}]);