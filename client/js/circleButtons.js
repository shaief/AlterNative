toggleCircle = function(circleId){
    $('.circle').not($('#' + circleId)).removeClass('active');
    $('.circle#' + circleId).toggleClass('active');

    // remove all category classes
    $('body').removeClass('ecology calories time money');
    $('h1').removeClass('ecology calories time money');
    $('h4').removeClass('ecology calories time money');

    // add only relevant class
    $('body').addClass(circleId);
    $('h1').addClass(circleId);
    $('h4').addClass(circleId);
    $('label').addClass(circleId);

};
