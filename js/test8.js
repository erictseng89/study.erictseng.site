let cardNumber = 52;
let cardBank = [];
let tempBank = [];
let cardPlay = 24;
let hasShuffled = false;

function askCard() {
    do {
        cardPlay = prompt("要玩幾張?\n(2 ~ 52)", 4);
    }
    while (cardPlay < 2 || cardPlay > 52);

    for (i = 0; i < cardPlay; i++) {
        let imgMake = "<div class='cardBox'><img id='one' class='cardClass' name='cardName' onclick='check(" + i + ")' src='Game/g52.jpg'></div>"

        $(".gameBox").append(imgMake);
    }
    return;
}

$(document).ready(function() {
    let cardBankTotal = 55;
    for (let i = 0; i < 55; i++) {
        let path = "Game/g" + i + ".jpg";
        cardBank.push(path);
    }
    console.log("")
})

function shuffle() {
    console.log("洗牌開始");

    for (i = 0; i < cardPlay; i++) {

        let r = Math.floor(cardNumber*Math.random());
        let tempImage = cardBank[i];
        cardBank[i] = cardBank[r];
        cardBank[r] = tempImage;
    }

    for (let l = 0; l < cardPlay; l++) {
        tempBank[l] = "";
    }

    for (let j = 0; j < cardPlay / 2; j++) {
        let temp2 = cardBank[j];
        let r2 = 0;
        let upper = false;
        while (upper == false) {
            let r2 = Math.floor(cardPlay*Math.random()); 
            if (tempBank[r2] == "") {
                tempBank[r2] = cardBank[j];
                upper = true;
            }
        }


        let r3 = 0;
        let lower = false;
        while (lower == false) {
            let r3 = Math.floor(cardPlay*Math.random()); 
            if (tempBank[r3] == "") {
                tempBank[r3] = cardBank[j];
                break;
                
            }
        }
    }
    hasShuffled = true;
    console.log("洗牌完畢");
    return;
}


function hint() {
    if (hasShuffled == false) {
        alert("請先按[開始] 洗牌");
    }
    else {
        console.log("顯示提示")
        for (let i = 0; i < cardPlay; i++) {
            document.cardName[i].src=tempBank[i];
    
        }
        setTimeout("hide()", 2000);
    }
    return;
}

function hide() {
    for (let i = 0; i < cardPlay; i++) {
        document.cardName[i].src="Game/g52.jpg";
    } 
    $('#hintButton').attr("disabled", "disabled");
    console.log("隱藏提示");
    return;
}


let flip = false;
let card1= 0;
let card2= 0;
let hasStarted = false;
let timer1 = 0;
let timer2 = 0;
let now = new Date();

function check(index) {
    if (hasStarted == false) {
        $('#hintButton').attr("disabled", "disabled");
        timer1 = now.getTime();
        console.log(timer1);
    }
    if (hasShuffled != true) {
        alert("請先按[開始] 洗牌");
    }
    else {
        if (flip == false) {
            document.cardName[index].src=tempBank[index];
            card1 = index;
            flip = true;
        }
        else {
            document.cardName[index].src=tempBank[index];
            card2 = index;
            checker(card1, card2);
            flip = false;
        }
    }
    return;
}

function checker(card1, card2) {
    console.log("hit checker");
    source1 = document.cardName[card1].src;
    source2 = document.cardName[card2].src;
    console.log(source1);
    console.log(source2);

    if (source1 == source2) {
        // setTimeout("correct(card1, card2);", 1000);
        document.cardName[card1].src=cardBank[53];
        document.cardName[card2].src=cardBank[53];
    }
    else {
        // document.cardName[card1].src=cardBank[54];
        // document.cardName[card2].src=cardBank[54];
        setTimeout("incorrect(card1, card2)", 1000);        
    }
    return;
}

function correct(card1, card2) {
    document.cardName[card1].src=cardBank[53];
    document.cardName[card2].src=cardBank[53];
    setTimeout("removeImg(card1, card2)", 1000);
}

function removeImg (card1, card2) {
    console.log("hit remove");
    console.log(card1 + " " + card2)
    document.cardName[card1].css("display", "none");
    document.cardName[card2].css("display", "none");
}

function incorrect(card1, card2) {
        document.cardName[card1].src=cardBank[54];
        document.cardName[card2].src=cardBank[54];
        setTimeout("hide()", 1000);
    return;
}

askCard();