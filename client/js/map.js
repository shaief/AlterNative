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
    var start = new google.maps.LatLng(Session.get('to').lat, Session.get('to').lng);
    var end = new google.maps.LatLng(Session.get('from').lat, Session.get('from').lng);
    var request = {
        origin:start,
        destination:end,
        travelMode: Session.get('choosen').type
    };
    if(Session.get('choosen').type == google.maps.TravelMode.BICYCLING){
        request.travelMode = google.maps.TravelMode.WALKING;
        var telOfunStart = new google.maps.LatLng(Session.get('tel-o-fun-start').lat, Session.get('tel-o-fun-start').lng);
        var telOfunEnd = new google.maps.LatLng(Session.get('tel-o-fun-end').lat, Session.get('tel-o-fun-end').lng);
        var waypoints = [telOfunStart, telOfunEnd];
        waypoints = waypoints.map(function(place){
            return {
                stopover: false,
                location: place
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

