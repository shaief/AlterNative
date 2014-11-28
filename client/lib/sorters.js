ecoSorter = function(ride1, ride2){
	return ride1.emmissions < ride2.emmissions ? -1 : 1;;
}

calSorter = function (ride1, ride2) {
	return ride1.calories < ride2.calories ? -1 : 1;;
}

moneySorter = function (ride1, ride2) {
	return ride1.price > ride2.price ? 1 : -1;
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