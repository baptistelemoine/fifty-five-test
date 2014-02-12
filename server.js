
var express = require('express');
var path = require('path');
var http = require('http');
var _ = require('underscore');
var Q = require('q');

var app = module.exports = express();

app.configure(function () {
    app.use(express.logger('dev'));
    app.use(express.compress());
    app.use(express.bodyParser());
    app.use(express.static(path.join(__dirname, 'app')));
});

app.listen(3000);

//reformat response, will be more clean & easy on front end
//localhost:3000/data?type=d for daily scores
//localhost:3000/data?type=w for weekly scores
//if no query : daily scores by default
app.get('/data', function (request, response){
	
	http.get('http://demo55.apiary.io/data', function (res){
		var output = '';
		res.on('data', function (data){
			output += data;
		});
		res.on('end', function(){

			var type = request.query.type;
			if(type === 'd') type = 'DAILY';
			else if(type == 'w') type = 'WEEKLY';
			else type = 'DAILY';

			var result = JSON.parse(output);
			var dates = result.data[type].dates;
			var players = result.data[type].dataByMember;

			var list = _.map(dates, function (val, i){
				return {
					'date':val,
					'john':players.john.points[i],
					'mike':players.mike.points[i]
				};

			});
			list = _.filter(list, function (val){
				return !_.isNull(val.john) || !_.isNull(val.mike);
			});

			response.json(_.extend({}, {'data':list}, {'settings':result.settings}));
		});
	});

});
