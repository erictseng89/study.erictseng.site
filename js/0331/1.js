let tabContent = []
let currentTab = null;

function tabCreate() {
    $('#tabList').empty();
    let tabCount = $(`select`)[0].value;
    // console.log(tabCount);
    for (let i = 0; i < tabCount; i++) {
        let n = i + 1;
        $(`#tabList`).append(`<li id="tab${n}">Tab ${n}</li>`)
        // console.log(`created tab ${n}`);
        tabContent[i] = `這是 Tab ${n} 的內容`;
        // console.log(tabContent[i]);
    }
    enableTab(toName(0), 0);
}

function clickTab() {
    let tabName = event.target.id;
    let index = toIndex(tabName);
    if (currentTab != null) {
        disableTab(currentTab);
    }
    enableTab(tabName, index);
}

function enableTab(tabName, index) {
    let tab = $(`#${tabName}`);
    tab.css("background-color", "white", ); 
    tab.css("border-bottom-color", "white");
    tab.css("transform", "scale(1.05)");
    $('main textarea').val(tabContent[index]);
    currentTab = index;
    // console.log(`current tab is ${currentTab}`);
}

function disableTab(index) {
    tabContent[currentTab] = $('main textarea').val();
    let tabName = toName(index);
    let tab = $(`#${tabName}`);
    // console.log(`${tabName}'s content is ${tabContent[index]}`);
    tab.css("transform", "scale(1)");
    tab.css("background-color", "grey");
    tab.css("border-bottom-color", "grey");
}

function toName (index) {
    let tabName = `tab${index + 1}`;
    return tabName;
}

function toIndex(tabName) {
    let index = parseInt(tabName.slice(-1)) - 1;
    return index;
}


$('#tabList').on("click", "li", clickTab);
