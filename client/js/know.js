toggleCircle(Session.get('sorter'));

Template.know.events({
    'click .back': function () {
        moveToView('set-route');
    }
});

Template.know.events({
    'click .circle': function () {
        $(".circle").click(function () {
            var circleId = $(this).attr("id");
            console.log('the ' + circleId + '  circle button was clicked');
            toggleCircle(circleId);
        });
    }
});
