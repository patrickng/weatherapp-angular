'use strict';

app.controller('LocationCtrl', ['$scope', 'panelRelayService', 'locationStorageService', function($scope, panelRelay, locationStorage) {

	if ((locationStorage.get() == null) || (locationStorage.get() == undefined) || (locationStorage.get() == "")) {
		$scope.locations = [{ name: 'New York, NY' }, { name: 'San Francisco, CA' }];
		locationStorage.set($scope.locations);
	} else {
		$scope.locations = locationStorage.get();
	}

	$scope.addLocation = function() {
		$scope.locations.push({ name: $scope.locationName });
		locationStorage.set($scope.locations);
		$scope.locationName = '';
	};

	$scope.removeLocation = function(location) {
		$scope.locations.splice($scope.locations.indexOf(location), 1);
		locationStorage.set($scope.locations);
	};

	$scope.selectedLocation = function(location) {
		$scope.currentSelectedLocation = location;
		$scope.currentSelectedLocation.city = $scope.currentSelectedLocation.name.split(',')[0].replace(/\s+/g, '_');
		$scope.currentSelectedLocation.state = $scope.currentSelectedLocation.name.split(',')[1].replace(/\s+/g, '');

		panelRelay.prepForBroadcast($scope.currentSelectedLocation);
	};
	
}]);