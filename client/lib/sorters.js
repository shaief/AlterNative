KnowGo.sortby = {
	ECO: "ecology",
	CAL: "calories",
	MONEY: "money",
	TIME: "time"
}


ecoSorter = function(ride1, ride2){
	return -1;
}

calSorter = function (ride1, ride2) {
	return -1;
}

moneySorter = function (ride1, ride2) {
	return -1;	
}

timeSorter = function (ride1, ride2) {
	return 	ride1.duration > ride2..duration?  -1 : 1; 
}

var sorters = {
	KnowGo.sortby.ECO: ecoSorter,
	KnowGo.sortby.CAL: calSorter,
	KnowGo.sortby.MONEY: moneySorter,
	KnowGo.sortby.TIME: timeSorter
}

getSorter = function () {
	return sorters[Session.get('sorter')];
}