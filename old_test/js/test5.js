let timesMax = 9;

function rowStart(){
	document.write("<div style='display: flex'>")
} 

function rowEnd (){
	document.write("</div>")
}

for (let i = 1; i < timesMax + 1; i++) {
	rowStart();
	for (let j = 1; j <= timesMax; j++) {
		result = i * j;
		document.write("<div style='border: black solid 1px; width: 80px; text-align: center; font-family: monospace'>"  + i + " x " + j + " = " + result + "</div>");
		document.write(" ");
	}
	rowEnd();
}