const cardNumber = 52;
let cardBank = [];
let tempBank = [];
let cardPairs = 12;
let cardPlay = cardPairs * 2;
let hasLoaded = false;
let hasShuffled = false;
let isBusy = false;
let flip = false;
let card1= 0;
let card2= 0;
let hasStarted = false;
let timer1 = 0;
let timer2 = 0;
let elapsedTime = 0;
let winCount = 0;

function startPlaying() {
    $(".gameBox").empty();
    askCard();
    shuffle()
    return;
}

function askCard() {
    // $(".gameBox").HTML = "";
    let boxValue = document.querySelector('#cardPlayBox').value;
    if (boxValue == "") {
        cardPairs = 12;
    }
    else {
        cardPairs = document.querySelector('#cardPlayBox').value;
    }
    
    cardPlay = cardPairs * 2;
    for (i = 0; i < cardPlay; i++) {
        let imgMake = `<div class='cardBox'><img id='img${i}' class='cardClass' name='cardName' onclick='check(${i})' src='Game/g52.jpg'></div>`

        $(".gameBox").append(imgMake);
    }
    // $('#hintButton').attr("disabled", "disabled");
    return;
}

function loadCards() {
    console.log("置入卡圖開始")
    let cardBankTotal = 55;
    for (let i = 0; i < 55; i++) {
        let path = "Game/g" + i + ".jpg";
        cardBank.push(path);
    }
    hasLoaded = true;
    console.log("置入卡圖完畢")
}

function shuffle() {
    if (hasLoaded != true) {
        loadCards();
    }
    console.log("洗牌開始");
    winCount = 0;
    for (i = 0; i < cardPairs; i++) {
        let r = Math.floor(cardNumber*Math.random());
        let tempImage = cardBank[i];
        cardBank[i] = cardBank[r];
        cardBank[r] = tempImage;
        // console.log(cardBank[i])
    }
    for (let l = 0; l < cardPlay; l++) {
        tempBank[l] = "";
    }
    for (let j = 0; j < cardPairs; j++) {
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
    hasStarted = false;
    hasShuffled = true;
    $("#hintB")[0].disabled=false;
    console.log("洗牌完畢");
    return;
}

function reveal () {
    if (!hasShuffled) {
        alert("需要先洗牌");
        return;
    }
    isBusy = true;
    for (let i = 0; i < cardPlay; i++) {
        document.cardName[i].src=tempBank[i];
    }
    setTimeout("hide()", 2000);
    return;
}

function hide() {
    cardPlay = cardPairs * 2;
    for (let i = 0; i < cardPlay; i++) {
        document.cardName[i].src="Game/g52.jpg";
    } 
    console.log("隱藏提示");
    $("#hintB")[0].disabled=true;
    isBusy = false;
    return;
}

function check(index) {
    if (isBusy) {
        return;
    }
    if (!hasStarted) {
        $("#hintB")[0].disabled=true;
        let now = new Date();
        timer1 = now.getTime();
        hasStarted = true;
        console.log(timer1);
    }
    else {
        let now = new Date();
        timer2 = now.getTime();
        console.log(timer2);
        elapsedTime = Math.floor((timer2 - timer1)/1000);
        console.log(elapsedTime);
        $('#timerBox')[0].value = elapsedTime;
    }
    if (!hasShuffled) {
        alert("請先按[開始] 洗牌");
    }
    else {


        if (flip == false) {
            document.cardName[index].src=tempBank[index];
            card1 = index;
            flip = true;
        }
        else if (index == card1) {
            ;
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
    isBusy = true;
    source1 = document.cardName[card1].src;
    source2 = document.cardName[card2].src;

    if (source1 == source2) {
        setTimeout("correct(card1, card2);", 500);
        card1 = "";
        card2 = "";
    }
    else {
        setTimeout("incorrect(card1, card2)", 500);        
    }
    return;
}

function correct(card1, card2) {
    document.cardName[card1].src=cardBank[53];
    document.cardName[card2].src=cardBank[53];
    console.log(cardPairs);
    winCount++;
    console.log (winCount);
    if (winCount == cardPairs) {
        removeImg(card1, card2);
        alert(`恭喜您浪費了您${elapsedTime}秒的寶貴時間。\n要不要再繼續浪費生命?`);
        setTimeout("startPlaying()", 300);
    }
    else {
        setTimeout("removeImg(card1, card2)", 500);
    }
    
}

function removeImg (card1, card2) {
    first = `img${card1}`;
    second = `img${card2}`;
    $(`#${first}`).css("display", "none");
    $(`#${second}`).css("display", "none");
    isBusy = false;
    return;
}

function incorrect(card1, card2) {
        document.cardName[card1].src=cardBank[54];
        document.cardName[card2].src=cardBank[54];
        setTimeout("hide2(card1, card2)", 500);
    return;
}

function hide2(card1, card2) {
    document.cardName[card1].src="Game/g52.jpg"
    document.cardName[card2].src="Game/g52.jpg"
    isBusy = false;
    return
}

askCard();
startPlaying();