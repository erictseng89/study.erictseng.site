// firebase

// Must use var instead of let here.
var firebase;
$( () => {
    let 
        userName = $('#name'), 
        message = $('#message'), 
        sendButton = $('#sendButton'),
        chat = $('#chatContents'),
        ms = new Date().getTime();

    var config = {
        //databaseURL: "https://test0504-e0273.firebaseio.com/" //你的資料庫名稱
        databaseURL: "https://maps-chatbox-default-rtdb.firebaseio.com/"
    };
/*     let firebaseConfig = {
        databaseURL: "https://maps-chatbox-default-rtdb.firebaseio.com/"
    }; */

    firebase.initializeApp(config);
    let database = firebase.database().ref();

    sendButton.on('click', write);

    message.on('keydown', (key) => {
        if (key.keyCode == 13) {
            write();
        }
    });

    function write() {
        let date = new Date();
        let
            h = date.getHours(),
            m = date.getMinutes(),
            s = date.getSeconds();

        h = h < 10 ? '0' + h : h;
        m = m < 10 ? '0' + m : m;
        s = s < 10 ? '0' + s : s;

        let timeNow = `${h} : ${m} : ${s}`;

        let postData = {
            name:userName.val(),
            content:message.val(),
            time:timeNow,
            id:'id'+ms
        };

        database.push(postData);
        message.val('');
    }

    database.once('value', (snapshot) => {
        chat.html('');
        for (let i in snapshot.val()) {
            let c = snapshot.val()[i];
            chat.prepend(`<div><div>${c.time}</div>${c.name} 說: ${c.content}</div>`)
        }
/*         snapshot.val().forEach( (a) => {
            chat.prepend(`<div><div>${a.time}</div> ${a.name} 說: ${a.content}</div>`);
        }) */
    });

    database.limitToLast(1).on('value', (snapshot) => {
        for (let i in snapshot.val()) {
            let c = snapshot.val()[i];
            chat.prepend(`<div class="${c.id}"><div>${c.time}</div>${c.name} 說: ${c.content}</div>`);
        }
/*         snapshot.val().forEach( (a) => {
            chat.prepend(`<div class="${a.id}"><div>${a.time}</div>${a.name} 說: ${a.content}</div>`); 
        }) */
    });
});






/* let pos;
let map;
let messages = document.getElementById("chat_contents").value;
let people = []; */

/* function send {
    let name = document.getElementById("name").value;
    let pokemon = document.getElementById("pokemon").value;
    sender(name, pokemon);
}

function sender(name, icon) {
    this.name = name;
    this.icon = icon;
} */

/* function addToChat(newText) {
    
}

if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition( (position) => {
        pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
        }
        console.log(pos);
    })
}

else {
  alert ("定位發生錯誤")
}

function initMap() {
    map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: 24.136813, lng: 120.685230 },
        // center: pos,
        zoom: 14,
    });
} */

