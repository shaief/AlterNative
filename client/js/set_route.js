Session.setDefault('sort-by', KnowGo.sortby.ECO);

Template.setRoute.rendered = function () {
    toggleCircle("ecology");
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

    },
    'click .circle': circleClickHandler
});
