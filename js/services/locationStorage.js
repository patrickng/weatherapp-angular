'use strict';

app.factory('locationStorageService', function() {
	var STORAGE_ID = 'locations-angularjs';

	// local storage
	if (!window.localStorage) {


		return {
			get: function() {
				return JSON.parse(localStorage.getItem(STORAGE_ID) || '[]');
			},

			set: function(locations) {
				localStorage.setItem(STORAGE_ID, JSON.stringify(locations));
			}
		};

	}

	// ajax storage

	// return {
	// 	get: function() {
	// 		alert('i was retrieved from server');
	// 	},
	// 	set: function(value) {
	// 		alert('im storing my shiz on the server');
	// 	}
	// }
});