'use strict';

var app = angular.module('weatherApp', []);

app.factory('panelRelayService', function($rootScope) {
	var relayService = {};

	relayService.prepForBroadcast = function(location) {
		this.location = location;
		this.broadcastNotification(this.location);
	}

	relayService.broadcastNotification = function(location) {
		$rootScope.$broadcast('handleLocationUpdate', location);
	}

	return relayService;
});

app.controller('LocationDetailCtrl', ['$scope', '$http', 'panelRelayService', function($scope, $http, panelRelayService) {


	$scope.$on('handleLocationUpdate', function(event, location) {
		$scope.currentSelectedLocation = location;
		$scope.loadData = function(location) {
			var endpointURLs = {
				hourlyForecast: 'http://api.wunderground.com/api/420cc13d75d8f243/hourly/q/'+$scope.currentSelectedLocation.state+'/'+$scope.currentSelectedLocation.city+'.json?callback=JSON_CALLBACK',
				tenDayForecast: 'http://api.wunderground.com/api/420cc13d75d8f243/forecast10day/q/'+$scope.currentSelectedLocation.state+'/'+$scope.currentSelectedLocation.city+'.json?callback=JSON_CALLBACK'
				// hourlyForecast: "/js/hourly.json",
				// tenDayForecast: "/js/10day.json"
			};
			var hourlyResults = [];
			var tenDayResults = [];

			$http.jsonp(endpointURLs.hourlyForecast).
				success(function(data) {
					angular.forEach(data.hourly_forecast, function(data) {
						var obj = {
							time: data.FCTTIME.civil,
							formatted_date: data.FCTTIME.month_name + " " + data.FCTTIME.mday,
							temp: data.temp.english + "F",
							humidity: data.humidity + "%",
							condition: data.condition, 
							icon_url: data.icon_url,
							shouldShowDate: function() {
								if ((data.FCTTIME.hour == "23") || (data.FCTTIME.hour == "0")) {
									return true;
								} else {
									return false;
								}
							}
						}
						hourlyResults.push(obj);
					});
				});


			$http.jsonp(endpointURLs.tenDayForecast).
				success(function(data) {
					angular.forEach(data.forecast.simpleforecast.forecastday, function(data){
						var obj = {
							time: data.date.pretty, 
							high: data.high.fahrenheit + "F",
							low: data.low.fahrenheit + "F", 
							conditions: data.conditions,
							icon_url: data.icon_url
						}
						tenDayResults.push(obj);
					});
				});

			$scope.hourlyResults = hourlyResults;
			$scope.tenDayResults = tenDayResults;
		};

		$scope.loadData();
	});
}]);

app.controller('LocationCtrl', ['$scope', 'panelRelayService', function($scope, panelRelayService) {

	$scope.locations = [
		{ name: 'New York, NY' }, 
		{ name: 'San Francisco, CA' }
	];

	$scope.addLocation = function() {
		$scope.locations.push({ name: $scope.locationName });
		$scope.locationName = '';
	};

	$scope.selectedLocation = function(location) {
		$scope.currentSelectedLocation = location;
		$scope.currentSelectedLocation.city = $scope.currentSelectedLocation.name.split(',')[0].replace(/\s+/g, '_');
		$scope.currentSelectedLocation.state = $scope.currentSelectedLocation.name.split(',')[1].replace(/\s+/g, '');

		panelRelayService.prepForBroadcast($scope.currentSelectedLocation);
	};
	
}]);

