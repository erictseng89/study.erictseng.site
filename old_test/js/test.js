// $('#nomember').mouseup (function () {
//     alert("你竟然沒有會員?!!!");
// });


$('#nomember').bind('mouseup', noMemberAlert);
$('textarea').bind('click', textBoxMember);
// $('textarea').bind('keypress', textBoxMember);


function textBoxMember () {
    goodreview = "---僅給寫好評---\n";
    for (i = 0; i < 3; i++) {
        goodreview += goodreview;
    }
    $(this).html(goodreview);
};

function noMemberAlert () {
    alert("你竟然沒有會員?!!!");
}


$("#click").bind('click', funcA);

function funcA() {
    // $(this).fadeTo(500, 0.5);
    $('#box').slideToggle(500);
}

var logoFunc = function() {
    var y = window.scrollY;
    // alert("scrollY = " + y);
    if (y >= 500) { 
        $("#box").slideDown(500);
        
    }
    else {
        $("#box").fadeOut(500);
    }  
};

window.addEventListener("scroll", logoFunc);