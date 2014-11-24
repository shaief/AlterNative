Template.know.rendered = function() {
    toggleCircle(Session.get('sorter'));
};

Template.know.helpers({
    routes: function () {
        var sorter = getSorter(Session.get('sorter'));
        var distances = Session.get('distances');
        var rides = Object.keys(distances).map(function(type, i) {
            var ride = distances[type];
           console.log(ride);
            return ride;
        })
        .sort(sorter);
        return rides;
    }
});

Template.know.events({
    'click .back': function () {
        moveToView('set-route');
    }
});

Template.know.events({
    'click .circle': function () {
        $(".circle").unbind().click(function () {
            var circleClass = $(this).children().attr("class");
            console.log('the ' + circleClass + '  circle button was clicked');
            toggleCircle(circleClass);
        });
    }
});

// Template.know.rendered = function (){
//     console.log(Session.get('sorter'))
//     toggleCircle(Session.get('sorter'));
// }
