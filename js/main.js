function LocationCtrl($scope, $http) {
	'use strict';

	$scope.locations = [
		{ name: 'New York, NY' }, 
		{ name: 'San Francisco, CA' }
	];

	$scope.addLocation = function() {
		$scope.locations.push({ name: $scope.locationName });
		$scope.locationName = '';
	};

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