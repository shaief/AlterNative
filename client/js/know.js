Template.know.helpers({
    routes: function () {
        var distances = Session.get('distances');
        var rides = Object.keys(distances).map(function(type, i) {
            var ride = distances[type];
           // ride.type = type;
           console.log(ride);
            return ride;
        })
        .sort(function(ride1, ride2){
            return -1;
        });
        return rides;
    }
})

Template.know.events({
    'click .back': function () {
        moveToView('set-route');
    }
});

Template.know.events({
    'click .circle': function () {
        $(".circle").click(function () {
            var circleId = $(this).attr("id");
            console.log('the ' + circleId + '  circle button was clicked');
            toggleCircle(circleId);
        });
    }
});

// Template.know.rendered = function (){
//     console.log(Session.get('sorter'))
//     toggleCircle(Session.get('sorter'));
// }