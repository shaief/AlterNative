Template.dcVisualization.rendered = function(){
	var weekday = new Array(7);
	weekday[0]=  "Sunday";
	weekday[1] = "Monday";
	weekday[2] = "Tuesday";
	weekday[3] = "Wednesday";
	weekday[4] = "Thursday";
	weekday[5] = "Friday";
	weekday[6] = "Saturday";

	function print_filter(filter){
		var f=eval(filter);
		if (typeof(f.length) != "undefined") {}else{}
		if (typeof(f.top) != "undefined") {f=f.top(Infinity);}else{}
		if (typeof(f.dimension) != "undefined") {f=f.dimension(function(d) { return "";}).top(Infinity);}else{}
		console.log(filter+"("+f.length+") = "+JSON.stringify(f).replace("[","[\n\t").replace(/}\,/g,"},\n\t").replace("]","\n]"));
	} 

	var data = UserNavigations.find().fetch().filter(
            function(d){
            	return (d['origin'].indexOf('Tel Aviv-Yafo') > -1)
            }).filter(
            function(d){
            	return (d['destination'].indexOf('Tel Aviv-Yafo') > -1)
            });
    console.log(data);
    // debugger;

	var ndx = crossfilter(data);

	var dateDim = ndx.dimension(function(d) {return d['date'];});
	var transportationDuration = dateDim.group().reduceSum(function(d) {return d['duration'];}); 
	// var transportationMethods = dateDim.group().reduceSum(dc.pluck('name')); 
	console.log(dateDim);
	console.log(transportationDuration);

	var minDate = dateDim.bottom(1)[0].date;
	var maxDate = dateDim.top(1)[0].date;
	
	console.log(minDate);
	console.log(maxDate);

	
	data.forEach(function(d) {
	    d.Month = d.date.getMonth()+1;
	    d.Day = weekday[d.date.getDay()];
	    d.Hour = d.date.getHours();
	}); 

	var monthDim = ndx.dimension(function(d) {return +d.Month;});
	var month_total = monthDim.group().reduceSum(function(d) {return d.duration;});

	var dayDim = ndx.dimension(function(d) {return d.Day;});
	var day_total = dayDim.group().reduceSum(function(d) {return d.duration;});

	var hourDim = ndx.dimension(function(d) {return +d.Hour;});
	var hour_total = hourDim.group().reduceSum(function(d) {return d.duration;});

	var nameDim = ndx.dimension(function(d) {return d.name});
	var name_count = nameDim.group().reduceCount();
	var name_duration_total = nameDim.group().reduceSum(function(d) {return d.duration;});
	var name_distance_total = nameDim.group().reduceSum(function(d) {return d.distance;});
	// debugger;

	var hitslineChart  = dc.barChart("#chart-line-duration"); 
	hitslineChart
		.width(500).height(200)
		.dimension(dateDim)
		.group(transportationDuration)
		// .brushOn(false)
		.yAxisLabel("Duration [minutes]")  
		.x(d3.time.scale().domain([minDate,maxDate])); 

	var monthRingChart = dc.pieChart("#chart-ring-month");
	monthRingChart
	    .width(150).height(150)
	    .dimension(monthDim)
	    .group(month_total)
	    .innerRadius(30); 

	var dayRingChart = dc.pieChart("#chart-ring-day");
	dayRingChart
	    .width(150).height(150)
	    .dimension(dayDim)
	    .group(day_total)
	    .innerRadius(30); 

	var hourRingChart = dc.pieChart("#chart-ring-hour");
	hourRingChart
	    .width(150).height(150)
	    .dimension(hourDim)
	    .group(hour_total)
	    .innerRadius(30); 

	// var nameRingChart = dc.pieChart("#chart-ring-name");
	// nameRingChart
	//     .width(150).height(150)
	//     .dimension(nameDim)
	//     .group(name_duration_total)
	//     .innerRadius(30); 

var nameCountBarChart = dc.barChart("#bar-name-count");
	nameCountBarChart
		.width(500).height(200)
		.dimension(nameDim)
		.group(name_count)
		// .brushOn(false)
		.yAxisLabel("DB count")  
		.x(d3.scale.ordinal().domain(["driving", "taxi", "bus", "bike", "walking"])) // Need empty val to offset first value
		.xUnits(dc.units.ordinal); // Tell Dc.js that we're using an ordinal x axis

	// var nameDurationBarChart = dc.barChart("#bar-name-duration");
	// nameDurationBarChart
	// 	.width(500).height(200)
	// 	.dimension(nameDim)
	// 	.group(name_duration_total)
	// 	// .brushOn(false)
	// 	.yAxisLabel("Duration [minutes]")  
	// 	.x(d3.scale.ordinal().domain(["driving", "taxi", "bus", "bike", "walking"])) // Need empty val to offset first value
	// 	.xUnits(dc.units.ordinal); // Tell Dc.js that we're using an ordinal x axis

	// var nameDistanceBarChart = dc.barChart("#bar-name-distance");
	// nameDistanceBarChart
	// 	.width(500).height(200)
	// 	.dimension(nameDim)
	// 	.group(name_distance_total)
	// 	// .brushOn(false)
	// 	.yAxisLabel("Distance [km]")  
	// 	.x(d3.scale.ordinal().domain(["driving", "taxi", "bus", "bike", "walking"])) // Need empty val to offset first value
	// 	.xUnits(dc.units.ordinal); // Tell Dc.js that we're using an ordinal x axis

	var datatable   = dc.dataTable("#dc-data-table");
	datatable
	    .dimension(dateDim)
	    .group(function(d) {return d.Month;})
	    // dynamic columns creation using an array of closures
	    .columns([
	        function(d) { return d.date.getDate() + "/" + (d.date.getMonth()) + "/" + d.date.getFullYear(); },
	        function(d) {return d.name;},
	        function(d) {return d.distance;},
	        function(d) {return d.duration;}
	    ]);

	dc.renderAll();

};
