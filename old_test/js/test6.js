let sym = "&hearts;";
let space = "&nbsp";
let maxSym = 9;
let maxRow = (maxSym + 1) / 2;

function printSym(num) {
    for (let i = 1; i < num * 2; i++) {
        document.write(sym);
    }
}

function printSpace(num) {
    for (let i = maxRow - num; i >= 0; i--) {
        document.write(space);
    }
}

for (let i = 1; i <= maxRow; i++) {
    printSpace(i);
    printSym(i);
    document.write("<br>");
}

for (let j = maxRow; j > 0; j--) {
    printSpace(j);
    printSym(j);
    document.write("<br>");
}
