Template.main.helpers({
    from_location: function () {
        if (Session.get("from-location")) {
            return Session.get("from-location");
        }
    }
});

Template.main.events({
    'keyup .from-location': function (e) {
        Session.set(".google-json-api", $(".from-location").val());
        console.log("from location key up");
        if (e.which == 13) {
            console.log('You pressed enter!');
        }
    },

    'keyup .to-location': function (e) {
        Session.set(".google-json-api", $(".from-location").val());
        console.log("to location key up");
        if (e.which == 13) {
            console.log('You pressed enter!');
        }
    },

    'onclick .time': function () {
        $('.time').toggleClass('active');
    },

    'onclick .money': function () {
        $('.money').toggleClass('active');
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
    }
});
