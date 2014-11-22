toggleCircle = function(className, effectFunction){
    $('.circle').not($('.' + className)).removeClass('active');
    $('.circle.' + className).toggleClass('active');
    effectFunction();
    $('h1').removeClass('ecology calories time money');
    $('h4').removeClass('ecology calories time money');
    $('h1').addClass(className);
    $('h4').addClass(className);
    $('label').addClass(className);
    Session.set('sorter', className);
}
toggleEcology = function () {
    toggleCircle('ecology', function(){
        $('body').css("background", "green");    
    });
};

toggleCalories = function () {
    toggleCircle('calories', function(){
        $('body').css("background", "#fff");    
    });
};

toggleTime = function () {
    toggleCircle('time', function(){
        $('body').css("background-image", "url('Antique_mechanical_clock.jpg')");    
    });
};

toggleMoney = function () {
    toggleCircle('money', function(){
        $('body').css("background-image", "url('50_NIS_Bill.jpg')");    
    });

};