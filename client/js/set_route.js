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
        console.log(setDistanceMatric());
        moveToView('know');
    },
    'click .ecology': function () {
        console.log('ecology pressed');
        $('.circle').not($('.ecology')).removeClass('active');
        $('.ecology').toggleClass('active');
        $('body').css("background", "green");
    },
    'click .calories': function () {
        console.log('calories pressed');
        $('.circle').not($('.calories')).removeClass('active');
        $('.calories').toggleClass('active');
        $('body').css("background", "#fff");
    },

    'click .time': function () {
        console.log('time pressed');
        $('.circle').not($('.time')).removeClass('active');
        $('.time').toggleClass('active');
        $('body').css("background-image", "url('Antique_mechanical_clock.jpg')");
    },

    'click .money': function () {
        console.log('money pressed');
        $('.circle').not($('.money')).removeClass('active');
        $('.money').toggleClass('active');
        $('body').css("background-image", "url('50_NIS_Bill.jpg')");
        //$('body').css("background-color", "red");
    }
});