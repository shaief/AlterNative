Router.route('/map', function () {
    this.render('map');
});

Router.route('', function () {
    this.render('main');
});