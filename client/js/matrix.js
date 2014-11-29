setDistanceMatric = function () {
    Session.set('distances', {});
    setDistanceTransit(setDataTransit);
    setDistanceCar(setDataDriving);
    setDistanceWalking(setDataWalking);
    setTelOfunRoute();
};

setDistanceTransit = function (callback) {
    var origin = new google.maps.LatLng(
        Session.get('from').lat,
        Session.get('from').lng
    );
    var destination = new google.maps.LatLng(
        Session.get('to').lat,
        Session.get('to').lng
    );
    directionsService = new google.maps.DirectionsService();
    request = {
        origin: origin,
        destination: destination,
        travelMode: google.maps.TravelMode.TRANSIT
    };
    directionsService.route(request, callback);
};

setDistanceCar = function (callback) {
    setDistanceByType(google.maps.TravelMode.DRIVING, callback, null, null);
};

setDistanceWalking = function (callback) {
    setDistanceByType(google.maps.TravelMode.WALKING, callback, null, null);
};

setDistanceByType = function (type, callback, _origin, _destination) {
    if (!origin) {
        var origin = new google.maps.LatLng(
            Session.get('from').lat,
            Session.get('from').lng
        );
    }
    else{
        var origin = _origin;
    }
    if (!destination) {
        var destination = new google.maps.LatLng(
            Session.get('to').lat,
            Session.get('to').lng
        );
    }
    else{
        var destination = _destination;
    }
    var service = new google.maps.DistanceMatrixService();
    service.getDistanceMatrix({
        origins: [origin],
        destinations: [destination],
        travelMode: type,
        unitSystem: google.maps.UnitSystem.METRIC,
        durationInTraffic: false,
        avoidHighways: false,
        avoidTolls: false
    }, callback);
};

setTelOfunRoute = function () {
    var start = Session.get('from');
    var end = Session.get('to');
    var telOfunStart = getNearestStation(start.lng, start.lat);
    var telOfunEnd = getNearestStation(end.lng, end.lat);
    Session.set('tel-o-fun-start', telOfunStart);
    Session.set('tel-o-fun-end', telOfunEnd);

    var deferredArray = [];
    deferred1 = new $.Deferred();
    setDistanceByType(
        google.maps.TravelMode.WALKING,
        function(response, status) {
            telOfunWalkCallback(response, status);
            deferred1.resolve();
        },
        new google.maps.LatLng(start.lat, start.lng),
        new google.maps.LatLng(telOfunStart.lat, telOfunStart.lng)
    );
    deferred2 = new $.Deferred();
    setDistanceByType(
        google.maps.TravelMode.WALKING,
        function(response, status) {
            telOfunWalkCallback(response, status);
            deferred2.resolve();
        },new google.maps.LatLng(telOfunEnd.lat, telOfunEnd.lng),
        new google.maps.LatLng(end.lat, end.lng)
    );
    deferred3 = new $.Deferred();
    setDistanceByType(
        google.maps.TravelMode.WALKING,
        function(response, status) {
            telOfunBikeCallback(response, status);
            deferred3.resolve();
        },
        new google.maps.LatLng(telOfunStart.lat, telOfunStart.lng),
        new google.maps.LatLng(telOfunEnd.lat, telOfunEnd.lng)
    );
    deferredArray.push(deferred1);
    deferredArray.push(deferred2);
    deferredArray.push(deferred3);
    $.when(deferred1, deferred2, deferred3).then(function() {
        setDataCycling();
    });
};

telOfunBikeCallback = function (response, status) {
    var distances = Session.get('distances');
    var time = response.rows[0].elements[0].duration.value;
    var bike = Session.get('distances')[google.maps.TravelMode.BICYCLING] || {
            name: 'bike',
            duration: 0,
            type: google.maps.TravelMode.BICYCLING,
            price: 0.76,
            emmissions: 0
        };
    bike.duration += time / 60 / 4;
    distances[google.maps.TravelMode.BICYCLING] = bike;
    Session.set('distances', distances);
}

telOfunWalkCallback = function (response, status) {
    var distances = Session.get('distances');
    var time = response.rows[0].elements[0].duration.value;
    var bike = distances[google.maps.TravelMode.BICYCLING] || {
            duration: 0,
            name: 'bike',
            type: google.maps.TravelMode.BICYCLING,
            price: 0.76,
            emmissions: 0
        };
    bike.duration += time / 60;
    distances[google.maps.TravelMode.BICYCLING] = bike;
    Session.set('distances', distances);
}
