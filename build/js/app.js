'use strict';

var app = angular.module('weatherApp', []);

app.factory('appMessageRelay', function() {
	var appMessageRelayInstance;
	return appMessageRelayInstance;
});

function LocationDetailCtrl($scope, appMessageRelay) {
	$scope.currentLocation = null;
	$scope.displayLocation = function(location) {
		$scope.currentLocation = location;
		$scope.currentLocation.city = $scope.currentLocation.name.split(',')[0].replace(/\s+/g, '_');
		$scope.currentLocation.state = $scope.currentLocation.name.split(',')[1].replace(/\s+/g, '');
		$scope.getCurrentWeather($scope.currentLocation);
	};

	$scope.getCurrentWeather = function(location) {
		var endpointURLs = {
			// hourlyForecast: 'http://api.wunderground.com/api/420cc13d75d8f243/hourly/q/'+$scope.currentLocation.state+'/'+$scope.currentLocation.city+'.json?callback=?',
			// tenDayForecast: 'http://api.wunderground.com/api/420cc13d75d8f243/forecast10day/q/'+$scope.currentLocation.state+'/'+$scope.currentLocation.city+'.json?callback=?'
			hourlyForecast: "/js/hourly.json",
			tenDayForecast: "/js/10day.json"
		};
		$http({ method: 'GET', url: endpointURLs.hourlyForecast }).
			success(function(data) {
				// console.log(location);
				console.log(data);
				// $scope.currentLocation.temperature = data.temperature.english + "F",
				// $scope.currentLocation.humidity = data.humidity + "%",
				// $scope.currentLocation.condition = data.condition, 
				// $scope.currentLocation.icon_url = data.icon_url
				
			});

		// $http({ method: 'GET', url: endpointURLs.tenDayForecast }).
		// 	success(function(data) {
				// $scope.currentLocation.time = data.date.pretty, 
				// $scope.currentLocation.high = data.high.fahrenheit + "F",
				// $scope.currentLocation.low = data.low.fahrenheit + "F", 
				// $scope.currentLocation.conditions = data.conditions,
				// $scope.currentLocation.icon_url = data.icon_url
				// console.log(data);
			// });
		
	};
}

function LocationCtrl($scope, $http, appMessageRelay) {

	$scope.locations = [
		{ name: 'New York, NY' }, 
		{ name: 'San Francisco, CA' }
	];

	$scope.addLocation = function() {
		$scope.locations.push({ name: $scope.locationName });
		$scope.locationName = '';
	};

	
};// Avoid `console` errors in browsers that lack a console.
(function() {
    var method;
    var noop = function () {};
    var methods = [
        'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
        'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
        'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
        'timeStamp', 'trace', 'warn'
    ];
    var length = methods.length;
    var console = (window.console = window.console || {});

    while (length--) {
        method = methods[length];

        // Only stub undefined methods.
        if (!console[method]) {
            console[method] = noop;
        }
    }
}());

// Place any jQuery/helper plugins in here.
