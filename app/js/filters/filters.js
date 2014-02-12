'use strict';

app.filters.filter('dateFormat', [function(){
	return function (input){
		var dm = input.substring(4);
		return dm.substring(0,2).concat('/', input.substring(6, input.length));
	}
}]);