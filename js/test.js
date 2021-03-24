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


$("#box").bind('click', funcA);

function funcA() {
    // $(this).fadeTo(500, 0.5);
    $(this).slideToggle(500);
}