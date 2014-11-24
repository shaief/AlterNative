setCurrentLoaction = function (argument) {
    window.navigator.geolocation.getCurrentPosition(
        function (position) {
            Session.set('current_location', {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            });
            _setCurrentLoaction()
        },
        function (error) {
            console.log(error);
        }
    );
}        
_setCurrentLoaction = function  () {
    var geocoder = new google.maps.Geocoder();
    var lat = Session.get('current_location').lat; 
    var lng = Session.get('current_location').lng;
    var latlng = new google.maps.LatLng(lat, lng);
    geocoder.geocode({'latLng': latlng}, function(results, status) {
      console.log(results);
      var formatted_address = results[0].formatted_address
      Session.set('from', {
        formatted_address: formatted_address,
        lat: lat,
        lng: lng 
      });
      $('.from-location').val(formatted_address);
    });
}