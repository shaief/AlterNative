Session.setDefault('sort-by', KnowGo.sortby.ECO);

Template.setRoute.rendered = function () {
    setAutoComplete();
    setCurrentLoaction();
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
    'click .circle': function (jQueryEvent, BlazeTemplateInstance) {
        var circleClass = $(jQueryEvent.target).children().attr("class");
        console.log('the ' + circleClass + '  circle button was clicked');
        toggleCircle(circleClass);
    }
});