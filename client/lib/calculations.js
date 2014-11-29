alternativeTaxiString = "taxi";

//Gets distances matrix with different transportation types, extends each object 
//with calories and CO2 emmissions data

setDataDriving = function (response, status) {
	var distances = Session.get('distances');
	var element = response.rows[0].elements[0];
	var price = 2.738 * element.distance.value / 1000;
	distances[google.maps.TravelMode.DRIVING] = {
		duration: element.duration.value / 60,
		distance: element.distance.value / 1000,
		name: google.maps.TravelMode.DRIVING.toLocaleLowerCase(),
		type: google.maps.TravelMode.DRIVING,
		price: price,
		emmissions: 271 * element.distance.value, //271g CO2 per KM
		calories: 0
	};
	Session.set('distances', distances);
};

setDataTaxi = function (response, status) {
	var distances = Session.get('distances');
	var element = response.rows[0].elements[0];
	var price = 12.3 + (element.distance.value / 1000 * 0.7834) + (element.duration.value / 60 * 0.3);
	distances[alternativeTaxiString] = {
		duration: element.duration.value / 60,
		distance: element.distance.value / 1000,
		name: alternativeTaxiString.toLocaleLowerCase(),
		type: alternativeTaxiString,
		price: price,
		emmissions: 271 * element.distance.value, //271g CO2 per KM
		calories: 0
	};
	Session.set('distances', distances);
};


setDataWalking = function (response, status) {
	var distances = Session.get('distances');
	var element = response.rows[0].elements[0];
	var price = 0;
	distances[google.maps.TravelMode.WALKING] = {
		duration: element.duration.value / 60,
		distance: element.distance.value / 1000,
		name: google.maps.TravelMode.WALKING.toLocaleLowerCase(),
		type: google.maps.TravelMode.WALKING,
		price: price,
		emmissions: 0,
		calories: 4.4 * element.duration.value //4.4 calories burnt / minute
	};
	Session.set('distances', distances);
};

setDataTransit = function (response, status) {
	var distances = Session.get('distances');
	var leg = response.routes[0].legs[0];
	distances[google.maps.TravelMode.TRANSIT] = {
		duration: leg.duration.value / 60,
		distance: leg.distance.value / 1000,
		name: 'bus',
		type: google.maps.TravelMode.TRANSIT,
		price: 6.90,
		emmissions: 101 * leg.distance.value,
		calories: 0
	};
	Session.set('distances', distances);
};

setDataCycling = function (response, status) {
	var distances = Session.get('distances');
	distances[google.maps.TravelMode.BICYCLING].calories = 9.45 * distances[google.maps.TravelMode.BICYCLING].duration; //9.45 calories burnt / minute
	Session.set('distances', distances);
};
