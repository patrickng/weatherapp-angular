'use strict';

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