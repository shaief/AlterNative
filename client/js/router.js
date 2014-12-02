Router.route('/map', function () {
    this.render('map');
    $('body').removeClass('know-tint');
});

Router.route('/know', function () {
    if (Session.get('to')) {
        this.render('know');
        $('body').addClass('know-tint');
    }
    else {
        Router.go('/');
    }
});

Router.route('/', function () {
    this.render('setRoute');
    $('body').removeClass('know-tint');
});

