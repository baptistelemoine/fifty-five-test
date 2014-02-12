'use strict';

app.services.factory('DataService', ['$http', '$q', function ($http, $q) {

	return {

		parse:function(type){

			var q = $q.defer();

			$http.get('/data', {params:{type:type}})
			.success(function (data){
				q.resolve(data);
			});

			return q.promise;
		}
	};
}]);