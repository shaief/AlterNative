toggleEcology = function () {
    console.log('ecology pressed');
    $('.circle').not($('.ecology')).removeClass('active');
    $('.ecology').toggleClass('active');
    $('body').css("background", "green");
    $('h1').toggleClass('ecology');
    $('h4').toggleClass('ecology');
    //$('div').toggleClass('ecology');
};

toggleCalories = function () {
    console.log('calories pressed');
    $('.circle').not($('.calories')).removeClass('active');
    $('.calories').toggleClass('active');
    $('body').css("background", "#fff");
    $('h1').toggleClass('calories');
    $('h4').toggleClass('calories');
    //$('div').toggleClass('calories');
};

toggleTime = function () {
    console.log('time pressed');
    $('.circle').not($('.time')).removeClass('active');
    $('.time').toggleClass('active');
    $('body').css("background-image", "url('Antique_mechanical_clock.jpg')");
    $('h1').toggleClass('time');
    $('h4').toggleClass('time');
    //$('div').toggleClass('time');
};

toggleMoney = function () {
    console.log('money pressed');
    $('.circle').not($('.money')).removeClass('active');
    $('.money').toggleClass('active');
    $('body').css("background-image", "url('50_NIS_Bill.jpg')");
    //$('body').css("background-color", "red");
    $('h1').toggleClass('money');
    $('h4').toggleClass('money');
    //$('div').toggleClass('money');
};