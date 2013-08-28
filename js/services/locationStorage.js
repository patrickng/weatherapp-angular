'use strict';

app.factory('locationStorageService', function() {
	var STORAGE_ID = 'locations-angularjs';

	return {
		get: function() {
			return JSON.parse(localStorage.getItem(STORAGE_ID) || '[]');
		},

		set: function(locations) {
			localStorage.setItem(STORAGE_ID, JSON.stringify(locations));
		}
	};
});