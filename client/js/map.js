var directionsDisplay;
var directionsService = new google.maps.DirectionsService();
var map;

var initializeMap = function () {
    directionsDisplay = new google.maps.DirectionsRenderer();
    var chicago = new google.maps.LatLng(41.850033, -87.6500523);
    var mapOptions = {
        zoom:7,
        center: chicago
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

