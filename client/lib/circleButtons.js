toggleCircle = function(circleClass){
    //$('.circle').children().not($('span.' + circleClass)).removeClass('active');
    $('div.circle').not('.circle .'+circleClass).removeClass('active');
    $('.' + circleClass).parent('div.circle').toggleClass('active');

    // remove all category classes and add only relevant class
    $('body').removeClass('ecology calories time money').addClass(circleClass);
    $('h4').removeClass('ecology calories time money').addClass(circleClass);

    Session.set('sort-by', circleClass);
};

circleClickHandler = function (jQueryEvent, BlazeTemplateInstance) {
    var circleClass = $(jQueryEvent.target).children('span').attr('class');
    console.log('the ' + circleClass + '  circle button was clicked');
    toggleCircle(circleClass);
};
