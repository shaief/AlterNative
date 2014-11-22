setAutoComplete = function (){
    var from = document.getElementsByClassName('from-location')[0];
    var to = document.getElementsByClassName('to-location')[0];
    var options = {
      componentRestrictions: {country: 'il'},
      types: []
    };
    new google.maps.places.Autocomplete(from, options);
    new google.maps.places.Autocomplete(to, options);
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
	  	Session.set('distances', distances);
	}
}
