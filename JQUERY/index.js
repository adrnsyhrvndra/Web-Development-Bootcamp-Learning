
$("h1").css("color","red");

$("h1").addClass("big-title margin-50");

$(".btn-dark").css("color","green").html("<b>FOOLS</b>");

// Manipulating Attribute With Jquery

$("img").attr("src","world.jpg");

// Event Listener

$("h1").hover(function(){

    $("h1").css("color","purple");

    setTimeout(function() {
        
        $("h1").css("color","red");

    },1000);

});

// Adding Removing Element

$("h1").before("<h2>WOWWWW</h2>");

$("h1").after("<h2>yeahhh</h2>");

$("h1").append("<h2>lorrr</h2>");


// Website Animation

$(".hiddden").on("click",function() {
    
    $("h1").slideToggle();

});
