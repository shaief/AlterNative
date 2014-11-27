
Session.setDefault('distances');

setAutoComplete = function (){
    setLocation ("from", 'from-location');
    setLocation ("to", 'to-location');   
}

setLocation = function (key, className) {
	var input = document.getElementsByClassName(className)[0];
	var options = {
      componentRestrictions: {country: 'il'},
      types: []
    };
    var autoComplete = new google.maps.places.Autocomplete(input, options);
	google.maps.event.addListener(autoComplete, 'place_changed', function () {
        var place = autoComplete.getPlace();
        var location = {
        	name: place.name,
        	formatted_address: place.formatted_address,	
        	lat: place.geometry.location.lat(),
        	lng: place.geometry.location.lng()
        };
        Session.set(key, location);
    });
}

setDistanceMatric = function () {
	Session.set('distances', {});
	setDistanceCar();
	setDistanceWalking();
	setDistanceTransit();
	setTelOfunRoute();	
	Meteor.setTimeout(function () {
		var distances = calculateCaloriesEmmissions(Session.get('distances'));
		Session.set('distances', distances);
	}, 3000);
}

setDistanceTransit = function() {
	var origin = $('.from-location').val();
	var destination = $('.to-location').val();
	directionsService = new google.maps.DirectionsService();
	request = {
	  origin: origin,
	  destination: destination,
	  travelMode: google.maps.TravelMode.TRANSIT
	};
	directionsService.route(request, function(response, status) {
	  var leg = response.routes[0].legs[0];

	  // var steps = leg.steps;
	  // var totalWalkingTime = 0;
	  // var totalTransitTime = 0;
	  // for(var s in steps){
	  // 	var step = steps[s];
	  // 	if()
	  // 		totalWalkingTime += legs.duration.value;
	  // }

	  var distances = Session.get('distances');
	  distances[google.maps.TravelMode.TRANSIT] = {
			duration: leg.duration.value / 60,
			distance: leg.distance.value / 1000,
			name: 'bus',
			type: google.maps.TravelMode.TRANSIT
		}
	  Session.set('distances', distances);
	});
}


setDistanceCar = function (){
	setDistanceByType(google.maps.TravelMode.DRIVING);
}

setDistanceWalking = function () {
	setDistanceByType(google.maps.TravelMode.WALKING);
}

setDistanceByType = function (type, callback, origin, destination) {
	if(!origin)
		var origin = $('.from-location').val();
	if(!destination)
		var destination = $('.to-location').val();

	var service = new google.maps.DistanceMatrixService();
	service.getDistanceMatrix({
	    origins: [origin],
	    destinations: [destination],
	    travelMode: type,
	    unitSystem: google.maps.UnitSystem.METRIC,
	    durationInTraffic: false,
	    avoidHighways: false,
	    avoidTolls: false
	  }, callback || defaultCallback);

	function defaultCallback(response, status) {
		var element = response.rows[0].elements[0]
	  	var distances = Session.get('distances');
	  	distances[type] = {
	  		duration: element.duration.value / 60,
	  		distance: element.distance.value / 1000,
	  		name: type.toLocaleLowerCase(),
	  		type: type 
	  	}
	  	// if(type == google.maps.TravelMode.WALKING) {
	  	// 	distances[google.maps.TravelMode.BICYCLING] = {
		  // 		duration: element.duration.value / 60 / 4,
		  // 		distance: element.distance.value / 1000,
		  // 		name: 'bike',
		  // 		type: google.maps.TravelMode.BICYCLING
		  // 	}	
	  	// }
	  	Session.set('distances', distances);
	}
};

setTelOfunRoute = function(){

	var start = Session.get('from');
	var end = Session.get('to');
	var telOfunStart = getNearestStation(start.lng, start.lat);
	var telOfunEnd = getNearestStation(end.lng, end.lat);
	var telOfunRoute = [
		start,
		telOfunStart,
		telOfunEnd,
		end
	];
	Session.set('tel-o-fun-route', telOfunRoute);
	setDistanceByType(
		google.maps.TravelMode.WALKING, 
		telOfunWalkCallback, 
		new google.maps.LatLng(start.lat, start.lng), 
		new google.maps.LatLng(telOfunStart.lat, telOfunStart.lng)
	);
};

telOfunBikeCallback = function(response, status){
	var time = response.rows[0].elements[0].duration.value;
	var bike = Session.get('distances')[google.maps.TravelMode.BICYCLING] || {
		name: 'bike',
		duration: 0,
		type: google.maps.TravelMode.WALKING
	};
	bike.duration += time / 60 / 4;
	distances[google.maps.TravelMode.BICYCLING] = bike;
	Session.set('distances', distances);
}

telOfunWalkCallback = function(response, status){
	var distances = Session.get('distances');
	var time = response.rows[0].elements[0].duration.value;
	var bike = distances[google.maps.TravelMode.BICYCLING] || {
		duration: 0,
		name: 'bike',
		type: google.maps.TravelMode.WALKING
	};
	bike.duration += time / 60;
	distances[google.maps.TravelMode.BICYCLING] = bike;
	Session.set('distances', distances);
}
