'use strict';

app.controllers.controller('HomeController', ['$scope', 'DataService', '$routeParams', function ($scope, DataService, $routeParams) {

	//main graph settings
	$scope.graphHeight = '350';
	$scope.graphWidth = '800';
	$scope.gap = 20;
	$scope.divider = 6;
	$scope.nbCharts = 0;

	//data returned
	$scope.items = [];

	//center main svg
	$scope.margin = 0;

	//toggle button
	$scope.type = $routeParams.type;

	//api request, daily or weekly view
	if($routeParams.type === 'daily'){
		DataService.parse().then(function (result){
			$scope.dataBind(result);
		});
	}
	else if($routeParams.type === 'weekly'){
		$scope.gap = 10;
		$scope.divider = 100;
		DataService.parse('w').then(function (result){
			$scope.dataBind(result);
		});
	}

	//promise ok, bind view data
	$scope.dataBind = function(result){
		$scope.nbCharts = result.data.length;
		$scope.chartWidth = ($scope.graphWidth / $scope.nbCharts) >> 2;
		$scope.items = result.data;
		$scope.settings = result.settings;
		$scope.margin = ($scope.graphWidth-(($scope.chartWidth*2)+$scope.gap)*$scope.items.length) >> 1;
	};

	//click on chart, enable detail view
	$scope.onItemClick = function(item, e){
		e.preventDefault();
		$scope.detailsActive = true;
		$scope.detail = item;
	};

}]);