setAutoComplete = function (){
    var from = document.getElementsByClassName('from-location')[0];
    var to = document.getElementsByClassName('to-location')[0];
    var options = {
      componentRestrictions: {country: 'il'},
      types: []
    };
    new google.maps.places.Autocomplete(from, options);
    new google.maps.places.Autocomplete(to, options);
}