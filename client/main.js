// counter starts at 0
Session.setDefault("counter", 0);

Template.main.helpers({
    from_location: function () {
        if (Session.get("from-location")) {
            return Session.get("from-location");
        }
    }
});

Template.main.events({
    'keyup .from-location': function () {
        Session.set(".google-json-api", Session.get(".from-location"));
    },
    'focus .from-location': function(){
        setAutoComplete();
    },
    'focus .to-location': function(){
        setAutoComplete();
    },
    'click .not-eco': function () {
        console.log('not-eco');
        $('.not-eco').toggleClass('btn-danger btn-default');
        $('.eco').toggleClass('btn-success btn-default');
        $('.eco').toggleClass('active');
        $('.not-eco').toggleClass('active');
    },
    'click .eco': function () {
        console.log('eco');
        $('.not-eco').toggleClass('btn-danger btn-default');
        $('.eco').toggleClass('btn-success btn-default');
        $('.eco').toggleClass('active');
        $('.not-eco').toggleClass('active');
    }
});

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