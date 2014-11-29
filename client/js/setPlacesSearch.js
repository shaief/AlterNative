Session.setDefault('distances');

setAutoComplete = function () {
    setLocation("from", 'from-location');
    setLocation("to", 'to-location');
}

setLocation = function (key, className) {
    var input = document.getElementsByClassName(className)[0];
    var bounds = new google.maps.LatLngBounds(
        new google.maps.LatLng(32.156958, 34.747717),
        new google.maps.LatLng(32.024032, 34.831488)
    );
    var options = {
        componentRestrictions: {country: 'il'},
        types: [],
        bounds: bounds
    };
    var autoComplete = new google.maps.places.Autocomplete(input, options);
    autoComplete.setBounds(bounds);
    google.maps.event.addListener(autoComplete, 'place_changed', function () {
        var place = autoComplete.getPlace();
        var location = {
            name: place.name,
            formatted_address: place.formatted_address,
            lat: place.geometry.location.lat(),
            lng: place.geometry.location.lng()
        };
        Session.set(key, location);
    });

    var telAviv = new google.maps.LatLng(32.054934, 34.775407);
    var mapOptions = {
        zoom:12,
        center: telAviv
    };
    var map = new google.maps.Map(document.getElementById('map-canvas'),
        mapOptions);
    autoComplete.bindTo('bounds', map);
}

