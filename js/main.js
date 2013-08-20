function WeatherAppCtrl($scope) {
	$scope.locations = [
		{name: 'New York, NY'}, 
		{name: 'San Francisco, CA'}];

	$scope.addLocation = function() {
		$scope.locations.push({ name: $scope.locationName });
		$scope.locationName = '';
	}
}