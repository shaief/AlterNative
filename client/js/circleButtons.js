toggleCircle = function(circleClass){
    //$('.circle').children().not($('span.' + circleClass)).removeClass('active');
    $('.' + circleClass).parent("div.circle").siblings().removeClass("active");
    $('.' + circleClass).parent("div.circle").toggleClass('active');

    // remove all category classes and add only relevant class
    $('body').removeClass('ecology calories time money').addClass(circleClass);
    $('h1').removeClass('ecology calories time money').addClass(circleClass);
    $('h4').removeClass('ecology calories time money').addClass(circleClass);

    Session.set('sort-by', circleClass);
};
