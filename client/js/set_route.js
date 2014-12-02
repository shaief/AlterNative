Session.setDefault('sort-by', KnowGo.sortby.ECO);

Template.setRoute.rendered = function () {
    toggleCircle("ecology");
    setAutoComplete();
    setCurrentLoaction();
    if(Session.get('from')){
        $('.from-location').val(Session.get('from').formatted_address);
    }
    if(Session.get('to')){
        $('.to-location').val(Session.get('to').formatted_address);
    }
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
