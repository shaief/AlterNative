Template.dbVisualization.rendered = function(){
	var dataset = UserNavigations.find().fetch().filter(
            function(d){
            	return (d['origin'].indexOf('Tel Aviv-Yafo') > -1)
            }).filter(
            function(d){
            	return (d['destination'].indexOf('Tel Aviv-Yafo') > -1)
            });
	var w = 400;
	var h = 300;

	var div = d3.select("body").append("div")   
	    .attr("class", "tooltip")               
	    .style("opacity", 0);

	var xScale = d3.scale.linear()
				.domain([0, d3.max(dataset, function(d) { return d['duration']; })])
				.range([0, w-10]);

	var yScale = d3.scale.linear()
				.domain([0, d3.max(dataset, function(d) { return d['distance']; })])
				.range([h-20, 10]);

	var circleRadius = 7;
	var circleStrokeWidth = 3;

	var partOfDay = function(d) {
		if (d.getHours() > 05 && d.getHours() <= 10) {return 'morning'}
		if (d.getHours() > 10 && d.getHours() <= 14) {return 'noon'}
		if (d.getHours() > 14 && d.getHours() <= 18) {return 'afternoon'}
		if (d.getHours() > 18 && d.getHours() <= 22) {return 'evening'}
		if (d.getHours() > 22 && d.getHours() <= 24) {return 'night'}
		if (d.getHours() > 00 && d.getHours() <= 05) {return 'night'}
	}
	// Colors dictionary by tranportation method:
	colors = {'bus': '#0000FF',
			  'bike': '#006600',
			  'walking': '#00CC00' ,
			  'driving': '#404040',
			  'taxi': '#808080'
	}

	timeColors = {'morning': '#FFFF33',
				  'noon': '#FF9900',
				  'afternoon': '#660000',
				  'evening': '#707070',
				  'night': '#000000'
	}

	transportation = ['bus', 'bike', 'walking', 'driving','taxi']

	//Create SVG element for D3
	var svg = d3.select("#visualized")
	            .append("svg")
	            .attr("width", w)
	            .attr("height", h);
	svg.selectAll("circle")
   .data(dataset)
   .enter()
   .append("circle")
   .attr("cx", function(d) {
   			return xScale(d['duration']);
   	})
   .attr("cy", function(d) {
   		if (isNaN(d['distance'])){
   			return yScale(0);
   		} else {
        return yScale(d['distance']);
    	}
    })
   .attr("r", circleRadius)
   .attr("fill", function(d){
   		return colors[d['name']];
   	})
   .attr("stroke", function(d){
   		return timeColors[partOfDay(d['date'])];
   	})
   .attr("stroke-width" ,circleStrokeWidth)
   	.attr("origin", function(d){
   			return d['origin'];
   })
   	.attr("destination", function(d){
   			return d['destination'];
   })
   	.on("mouseover", function(d) {      
            div.transition()        
                .duration(200)      
                .style("opacity", .9);      
            div .html("<strong>From:</strong> <span style='color:red'>" + d['origin'] + 
				    "<br><span style='color:black'><strong>To:</strong></span> <span style='color:red'>" + 
				    d['destination'] + 
				    "</span><br>" +
				    "<span style='color:black'><strong>Distance:</strong></span> <span style='color:red'>" + 
				    d['distance'] + 
				    "<span style='color:black'>[km]</span><br><span style='color:black'><strong>Duration:</strong></span> <span style='color:red'>" + 
				    d['duration'] + "</span><span style='color:black'>[minutes]</span>" +
				    "<br><span style='color:black'><strong>Date and time:</strong></span> <span style='color:red'>" + 
				    d['date'] + "</span>")  
                .style("left", (d3.event.pageX) + "px")     
                .style("top", (d3.event.pageY + 10) + "px");    
            })                  
        .on("mouseout", function(d) {       
            div.transition()        
                .duration(500)      
                .style("opacity", 0);   
    });

	svg.append("text")
	    .attr("class", "x label")
	    .attr("text-anchor", "end")
	    .attr("x", w)
	    .attr("y", h - 6)
	    .text("duration [minutes]");

	svg.append("text")
	    .attr("class", "y label")
	    .attr("text-anchor", "end")
	    .attr("y", 6)
	    .attr("dy", ".75em")
	    .attr("transform", "rotate(-90)")
	    .text("distance [km]");

// D3 text labels:
  //  svg.selectAll("text")
		// .data(dataset)
		// .enter()
		// .append("text")
		// .text(function(d) {
		// 	return d['name'];
		// })
		// .attr("x", function(d) {
		// 	return d['duration']*10;
		// })
		// .attr("y", function(d) {
	 //   		if (isNaN(d['distance'])){
	 //   			return (h-0+10);
	 //   		} else {
		//         return (h-d['distance']*10);
	 //    	}
  //   	})
		// .attr("font-family", "sans-serif")
		// .attr("font-size", "11px")
		// .attr("fill", "red");

	var legendRectSize = 18;
	var legendSpacing = 4;
	var svg = d3.select("#legend")
	            .append("svg");
	var legend = svg.selectAll('#legend')
				.data(transportation)
				.enter()
				.append('g')
				.attr('class', 'legend')
				.attr('transform', function(d, i) {
					var height = legendRectSize + legendSpacing;
					var offset =  10;
					var horz = 2 * legendRectSize;
					var vert = i * height + offset;
						return 'translate(' + horz + ',' + vert + ')';
					});

	legend.append('rect')
		.attr('width', legendRectSize)
		.attr('height', legendRectSize)
		.style('fill', function(d){
							return colors[d];
						}
		);
		
	legend.append('text')
		.attr('x', legendRectSize + legendSpacing)
		.attr('y', legendRectSize - legendSpacing)
		.text(function(d) { return d.toUpperCase(); });

};
