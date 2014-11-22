Session.setDefault('main-view', 'set-route');

moveToView = function(view) {
	Session.setDefault('main-view', view);
}

var mainViewState = function(state) {
	return Session.get('main-view') == state ? state : '';
}

Template.main.helpers({
	setRouteScreen: function (argument) {
		return mainViewState('set-route');
	},
	knowScreen: function (argument) {
		return mainViewState('know');	
	}
});