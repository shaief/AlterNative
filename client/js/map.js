var directionsDisplay;
var directionsService = new google.maps.DirectionsService();
var map;

var initializeMap = function () {
    directionsDisplay = new google.maps.DirectionsRenderer();
    var telAviv = new google.maps.LatLng(32, 34);
    var mapOptions = {
        zoom:7,
        center: telAviv
    };
    map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);
    directionsDisplay.setMap(map);
};

var calcRoute = function () {
    var start = Session.get('from').formatted_address;
    var end = Session.get('to').formatted_address;


    var request = {
        origin:start,
        destination:end,
        travelMode: Session.get('choosen').type
    };

    if(Session.get('choosen').type == google.maps.TravelMode.BICYCLING){

        request.travelMode = google.maps.TravelMode.WALKING; var telOfunRoute = Session.get('tel-o-fun-route');
        var telOfunStart = new google.maps.LatLng(telOfunRoute[1].lat, telOfunRoute[1].lng);
        var telOfunEnd = new google.maps.LatLng(telOfunRoute[2].lat, telOfunRoute[2].lng);;
        var waypoints = [telOfunStart, telOfunEnd];
        waypoints = waypoints.map(function(place){
            return {
                stopover: false,
                location: place.toString()
            };
        });
        request.waypoints = waypoints;
    }
    directionsService.route(request, function(result, status) {
        if (status == google.maps.DirectionsStatus.OK) {
            directionsDisplay.setDirections(result);
        }
    });
};

Template.map.rendered = function () {
    initializeMap();
    calcRoute();
};

