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
        	latitude: place.geometry.location.lat(),
        	longtitude: place.geometry.location.lng()
        } 
        Session.set(key, location);
    });
}

setDistanceMatric = function () {
	Session.set('distances', {});
	setDistanceCar();
	setDistanceWalking();
}

setDistanceCar = function (){
	setDistanceByType(google.maps.TravelMode.DRIVING);
}

setDistanceWalking = function () {
	setDistanceByType(google.maps.TravelMode.WALKING);	
}

setDistanceByType = function (type) {
	var origin = $('.from-location').val();
	var destination = $('.to-location').val();

	var service = new google.maps.DistanceMatrixService();
	service.getDistanceMatrix(
	  {
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
	  		duration: element.duration.value / 60,
	  		distance: element.distance.value / 1000
	  	}
	  	if(type == google.maps.TravelMode.WALKING) {
	  		distances[google.maps.TravelMode.BICYCLING] = {
		  		duration: element.duration.value / 60 / 4,
		  		distance: element.distance.value / 1000
		  	}	
	  	}
	  	Session.set('distances', distances);
	}
}