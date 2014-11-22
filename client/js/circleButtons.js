toggleCircle = function(className, effectFunction){
    $('.circle').not($('.' + className)).removeClass('active');
    $('.circle.' + className).toggleClass('active');
    effectFunction();

    // remove all category classes
    $('body').removeClass('ecology calories time money');
    $('h1').removeClass('ecology calories time money');
    $('h4').removeClass('ecology calories time money');

    // add only relevant class
    $('body').addClass(className);
    $('h1').addClass(className);
    $('h4').addClass(className);
    $('label').addClass(className);

    Session.set('sorter', className);
};

toggleEcology = function () {
    toggleCircle('ecology', function(){
        console.log('ecology');
    });
};

toggleCalories = function () {
//$('body').css("background", "green");
    toggleCircle('calories', function(){
        console.log('calories');
        //$('body').css("background", "#fff");
    });
};

toggleTime = function () {
    toggleCircle('time', function(){
        console.log('time');
        //$('body').css("background-image", "url('Antique_mechanical_clock.jpg')");
    });
};

toggleMoney = function () {
    toggleCircle('money', function(){
        console.log('money');
        //$('body').css("background-image", "url('50_NIS_Bill.jpg')");
    });

};