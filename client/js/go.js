Template.know.events({
    'click .go-btn': function () {
        //console.log('the go button was clicked, with value1:'+this.name);

        //UserNavigations = new Mongo.Collection('navigations'); //get a local view to the navigation collections  
        var jsonObjTo = JSON.parse(Session.keys.to);
        var jsonObjFrom = JSON.parse(Session.keys.from);
        
		var navRecord = {
			name: this.name,
			transType:this.type,
			distance:this.distance,
			duration:this.duration,
			date:new Date,
			origin:jsonObjFrom.formatted_address,
			destination:(jsonObjTo.name+" "+jsonObjTo.formatted_address)
		}

		//console.log("Inserting this to DB:"+navRecord);

		UserNavigations.insert(navRecord);

		//console.log("type:"+this.type+"|distance:"+this.distance+"|duration:"+this.duration);
        //console.log("Session.to:"+Session.keys.to);
        //console.log("Session.from:"+Session.keys.from);
        //Session.to:{"name":"Migdal Shalom","formatted_address":"Tel Aviv-Yafo, Israel","lat":32.064118,"lng":34.76970099999994} 
		//console.log("time:"+recordTime);
        //console.log('writing the following to MongoDB: name/type/duration/distance'+name+
        //	"/"+type+"/"duration+"/"+distance);
     }

});