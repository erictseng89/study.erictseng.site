let pos;
let map;
let messages = document.getElementById("chat_contents").value;
let people = [];

/* function send {
    let name = document.getElementById("name").value;
    let pokemon = document.getElementById("pokemon").value;
    sender(name, pokemon);
}

function sender(name, icon) {
    this.name = name;
    this.icon = icon;
} */

function addToChat(newText) {
    
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
}

