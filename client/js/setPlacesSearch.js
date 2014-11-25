setAutoComplete = function (){
    setLocation ("from", 'from-location');
    setLocation ("to", 'to-location');
};

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
        }
        Session.set(key, location);
    });
};

setDistanceMatric = function () {
	Session.set('distances', {});
	setDistanceCar();
	setDistanceWalking();
	setDistanceTransit();
	Meteor.setTimeout(function () {
		var distances = calculateCaloriesEmmissions(Session.get('distances'));
		Session.set('distances', distances);
	}, 1000);
};

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
			duration: (leg.duration.value / 60).toFixed(0),
			distance: (leg.distance.value / 1000).toFixed(2),
			name: 'bus',
			type: google.maps.TravelMode.TRANSIT,
			name: 'bus'
		};
	  Session.set('distances', distances);
	});
};


setDistanceCar = function (){
	setDistanceByType(google.maps.TravelMode.DRIVING);
};

setDistanceWalking = function () {
	setDistanceByType(google.maps.TravelMode.WALKING);
};

setDistanceByType = function (type) {
	var origin = $('.from-location').val();
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
	  }, callback);

	function callback(response, status) {
		var element = response.rows[0].elements[0]
	  	var distances = Session.get('distances');
	  	distances[type] = {
	  		duration: (element.duration.value / 60).toFixed(0),
	  		distance: (element.distance.value / 1000).toFixed(2),
	  		name: type.toLocaleLowerCase(),
	  		type: type 
	  	}
	  	if(type == google.maps.TravelMode.WALKING) {
	  		distances[google.maps.TravelMode.BICYCLING] = {
		  		duration: (element.duration.value / 60 / 4).toFixed(0),
		  		distance: (element.distance.value / 1000).toFixed(2),
		  		name: 'bike',
		  		type: google.maps.TravelMode.BICYCLING
		  	};
	  		name: type.toLocaleLowerCase()
	  	}
	  	if(type == google.maps.TravelMode.WALKING) {
	  		distances[google.maps.TravelMode.BICYCLING] = {
			duration: (element.duration.value / 60 / 4).toFixed(0),
				distance: (element.distance.value / 1000).toFixed(2)
		  	}
	  	}
	  	Session.set('distances', distances);
	}
};

