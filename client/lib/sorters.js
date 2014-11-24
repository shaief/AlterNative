ecoSorter = function(ride1, ride2){
	return ride1.emmissions < ride2.emmissions ? -1 : 1;;
}

calSorter = function (ride1, ride2) {
	return ride1.calories > ride2.calories ? -1 : 1;;
}

moneySorter = function (ride1, ride2) {
	function getWeight(type){
		weight = 0;
		switch(type){
			case google.maps.TravelMode.WALKING:
				weight = 1;
				break;
			case google.maps.TravelMode.BICYCLING:
				weight = 2;
				break;
			case google.maps.TravelMode.TRANSIT:
				weight = 3;
				break;
			case google.maps.TravelMode.DRIVING:
				weight = 4
				break; 
		}
		return weight;
	}
	var weight1 = getWeight(ride1);
	var weight2 = getWeight(ride2);
	return weight1 < weight2 ? 1 : -1; 
}

timeSorter = function (ride1, ride2) {
	return ride1.duration < ride2.duration ? -1 : 1; 
}

var sorters = {};
sorters[KnowGo.sortby.ECO] = ecoSorter;
sorters[KnowGo.sortby.CAL] = calSorter;
sorters[KnowGo.sortby.MONEY] = moneySorter;
sorters[KnowGo.sortby.TIME] = timeSorter;

getSorter = function (sorter) {
	return sorters[sorter];
}