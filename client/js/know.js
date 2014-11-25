Template.know.rendered = function() {
    toggleCircle(Session.get('sort-by'));
};

Template.know.helpers({
    routes: function () {
        var sorter = getSorter(Session.get('sort-by'));
        var distances = Session.get('distances');
        var rides = Object.keys(distances).map(function(type, i) {
            var ride = distances[type];
            ride.duration = Number(ride.duration.toFixed(0));
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
    'click .circle': circleClickHandler
});

