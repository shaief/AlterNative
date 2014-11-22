Template.setRoute.helpers({
    from_location: function () {
        if (Session.get("from-location")) {
            return Session.get("from-location");
        }
    }
});

Template.setRoute.rendered = function  () {
    setAutoComplete();
}

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
    },
    'click .know': function () {
        console.log(setDistanceMatric())
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