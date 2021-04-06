let choices = ["剪刀", "石頭", "布"];
let resultMsg = ["贏", "輸", "平手"];
let choice = "";
let resultBox = $('.result');
let hpMax = 10;
let hpP = 10;
let hpN = 10;

function play() {
	hpMax = parseInt($(`input:first`).val());
	hpP = hpMax; hpN = hpMax;
	let npc = $(".npc");
	let player = $(".player");
	npc.css(`background`, `linear-gradient(90deg, hsl(120, 100%, 50%) 100%, white 100%)`);
	player.css(`background`, `linear-gradient(90deg, hsl(120, 100%, 50%) 100%, white 100%)`);
	npc.text(`${hpMax}/${hpMax}`);
	player.text(`${hpMax}/${hpMax}`);
}

function choose() {
	choice = event.target.id;
	/* let npc = npcPlay()            
	let result = fight(choice, npc);
	hpCalc(result);
	let printer = `你選擇了${choice}。<br>`;
	printer += `電腦選擇了${npc}。<br>`;
	printer += `${result}。`;
	resultBox.html(printer); */
}

function choose2(choice) {
	let npc = npcPlay()            
	let result = fight(choice, npc);
	hpCalc(result);
	let printer = `你選擇了${choice}。<br>`;
	printer += `電腦選擇了${npc}。<br>`;
	printer += `${result}。`;
	resultBox.html(printer); 
}

function npcPlay() {
	let r = Math.floor(3*Math.random());
	let npcChoice = choices[r];
	return npcChoice;
}
function fight(p, n){
	let result = "";
	switch (p) {
		case n:
			result = resultMsg[2];
			break;
		case choices[0]:
			result = n == choices[2] ? resultMsg[0] : resultMsg[1];
			break;
		case choices[1]:
			result = n == choices[0] ? resultMsg[0] : resultMsg[1];
			break;
		case choices[2]:
			result = n == choices[1] ? resultMsg[0] : resultMsg[1];
			break;
		default:
			result = resultMsg[1];
	}
	return result;
}
function hpCalc(result) {
	switch (result) {
		case resultMsg[0]:
			takeDmg('npc');
			break;
		case resultMsg[1]:
			takeDmg('player');
			break;
		case resultMsg[2]:
			break;
	}
}

function takeDmg (side) {
	console.log(side);
	let color = 0;
	let blood = 0, white = 0;
	let target = $(`.${side}`)
	
	if (side == 'player') {
		hpP--;
		color = hpP/hpMax * 120;
		blood = hpP/hpMax * 100;
		white = blood + 3;
		// console.log(red, white);
		target.text(`${hpP}/${hpMax}`);
		if (hpP == 0){
			alert("你輸了");
			// play();
		}
	}
	else if (side == 'npc') {
		hpN--;
		color = hpN/hpMax * 120;
		blood = hpN/hpMax * 100;
		white = blood + 3;
		// console.log(red, white);
		target.text(`${hpN}/${hpMax}`);
		if (hpN == 0){
			alert("你贏了");
			// play();
		}
	}
	console.log(color);
	target.css(`background`, `linear-gradient(90deg, hsl(${color}, 100%, 50%) ${blood}%, white ${white}%)`);
}

let time = 5;

function start() {
	play();
	setTimeout("timer(time)", 1000);
	// }
	// else {
	//     alert("請輸入 1~999秒。")
	// }
}

function timer(sec) {
	console.log("timer trigged " + sec);
	$('.timerBox').text(sec);
	if (sec > 0) {
		let newSec = sec - 1;
		setTimeout(`timer(${newSec})`, 1000);
	}
	else if (sec == 0) {
		choose2(choice);
		setTimeout("timer(time)", 1000);
	}
}

$('li').bind("click", choose);
