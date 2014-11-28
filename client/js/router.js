Router.route('/map', function () {
    this.render('map');
});

Router.route('/know', function () {
    this.render('know');
});

Router.route('/', function () {
    this.render('setRoute');
});

