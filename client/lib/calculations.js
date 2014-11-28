//Gets distances matrix with different transportation types, extends each object 
//with calories and CO2 emmissions data
calculateCaloriesEmmissions = function (distances) {
	distances[google.maps.TravelMode.DRIVING].emmissions = 271 * distances[google.maps.TravelMode.DRIVING].distance; //271g CO2 per KM
	distances[google.maps.TravelMode.DRIVING].calories = 0;
	distances[google.maps.TravelMode.WALKING].emmissions = 0;
	distances[google.maps.TravelMode.WALKING].calories = 4.4 * distances[google.maps.TravelMode.WALKING].duration; //4.4 calories burnt / minute  
	distances[google.maps.TravelMode.BICYCLING].emmissions = 0;
	distances[google.maps.TravelMode.BICYCLING].calories = 9.45 * distances[google.maps.TravelMode.BICYCLING].duration; //9.45 calories burnt / minute
  	distances[google.maps.TravelMode.TRANSIT].emmissions = 101 * distances[google.maps.TravelMode.TRANSIT].distance; //101g CO2 / KM
	distances[google.maps.TravelMode.TRANSIT].calories= 0;
	return distances;
}


