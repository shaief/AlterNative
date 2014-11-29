Router.route('/map', function () {
    this.render('map');
});

Router.route('/know', function () {
    if (Session.get('to')) {
        this.render('know');
    }
    else {
        Router.go('/');
    }
}
);

Router.route('/', function () {
    this.render('setRoute');
});

