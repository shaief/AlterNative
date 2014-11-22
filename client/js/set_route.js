Session.setDefault('sort-by', KnowGo.sortby.ECO);

Template.setRoute.rendered = function  () {
    setAutoComplete();
};

Template.setRoute.events({
    'keyup .from-location': function () {
        Session.set(".google-json-api", Session.get(".from-location"));
    },
    'focus .from-location': function () {
        setAutoComplete();
    },
    'focus .to-location': function () {
        setAutoComplete();
    },
    'click .know': function () {
        setDistanceMatric();
        if(Session.get('from') && Session.get('to')){
            moveToView('know');
        }
        else{
            // TODO: hanlde error
        }
    },
    'click .ecology': function () {
        toggleEcology();
    },
    'click .calories': function () {
        toggleCalories();
    },

    'click .time': function () {
        toggleTime();
    },
    'click .money': function () {
        toggleMoney();
    }
});