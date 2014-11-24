toggleCircle(Session.get('sorter'));

Template.know.events({
    'click .back': function () {
        moveToView('set-route');
    }
});

Template.know.events({
    'click .circle': function () {
        $(".circle").unbind().click(function () {
            var circleClass = $(this).children().attr("class");
            console.log('the ' + circleClass + '  circle button was clicked');
            toggleCircle(circleClass);
        });
    }
});
