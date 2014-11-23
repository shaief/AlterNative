Session.setDefault('sort-by', KnowGo.sortby.ECO);

Template.setRoute.rendered = function () {
    setAutoComplete();
};

Template.setRoute.events({
    'focus .from-location': function () {
        setAutoComplete();
    },
    'focus .to-location': function () {
        setAutoComplete();
    },
    'click .know': function () {
        setDistanceMatric();
        if (Session.get('from') && Session.get('to')) {
            moveToView('know');
        }
        else {
            // TODO: hanlde error
        }
    },
    'click .circle': function () {
        $(".circle").click(function () {
            var circleId = $(this).attr("id");
            console.log('the ' + circleId + '  circle button was clicked');
            toggleCircle(circleId);
        });
    }
});