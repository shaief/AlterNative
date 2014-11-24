//Gets distances matrix with different transportation types, extends each object 
//with calories and CO2 emmissions data
calculateCaloriesEmmissions = function (distances) {
	var arrayLength = distances.length;
	for (var i = 0; i < arrayLength; i++) {
		switch (distances[i])
		{
		   case "google.maps.TravelMode.DRIVING" :
		   		distances[i]["emmissions"] = 271 * distances[i].distance; //271g CO2 per KM
		   		distances[i]["calories"] = 0;
		   		break;
		   	
		   case "google.maps.TravelMode.WALKING":
		   		distances[i]["emmissions"] = 0;
		   		distances[i]["calories"] = 4.4 * distances[i].duration; //4.4 calories burnt / minute  
		   		break;
		   case "google.maps.TravelMode.BICYCLING": 
		       	distances[i]["emmissions"] = 21 * distances[i].distance; //21g CO2 / KM
		   		distances[i]["calories"] = 9.45 * distances[i].duration; //9.45 calories burnt / minute
		      	break;
		    case "google.maps.TravelMode.TRANSIT": 
		       	distances[i]["emmissions"] = 101 * distances[i].distance; //101g CO2 / KM
		   		distances[i]["calories"] = 0;
		      	break;
		   default: 
		       console.log('ERROR:calculateCaloriesCO2, wrong type:'+distances[i]);
		       break;
		}
	}
}


