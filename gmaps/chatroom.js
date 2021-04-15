// firebase

// Must use var instead of let here.
var firebase;






/* let pos;
let map;

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
*/



/* function locate() {
    let pos;
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
    alert(pos);
    return pos;
}
 */




function initMap() {
    map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: 24.136813, lng: 120.685230 },
        // center: pos,
        zoom: 14,
    });

    const icons = [{
        url: 'https://cdn.bulbagarden.net/upload/thumb/2/21/001Bulbasaur.png/600px-001Bulbasaur.png',
        scaledSize: new google.maps.Size(50,50)
    }, {
        url: 'https://cdn.bulbagarden.net/upload/thumb/7/73/004Charmander.png/600px-004Charmander.png',
        scaledSize: new google.maps.Size(50,50)
    }, {
        url: "https://cdn.bulbagarden.net/upload/thumb/3/39/007Squirtle.png/250px-007Squirtle.png", 
        scaledSize: new google.maps.Size(50, 50)
    }, {
        url: "https://i.pinimg.com/originals/c5/67/9d/c5679d385fe4f711dcae098c70d59aa4.jpg", 
        scaledSize: new google.maps.Size(50, 50)       
    }];

    let newMarker;
    $( () => {
        let 
            userName = $('#name'), 
            message = $('#message'), 
            sendButton = $('#sendButton'),
            deleteButton = $('#deleteButton'),
            chat = $('#chatContents'),
            ms = new Date().getTime();
    
        var config = {
            databaseURL: "https://maps-chatbox-default-rtdb.firebaseio.com/"
        };
    
    
        firebase.initializeApp(config);
        let database = firebase.database().ref();
    


        message.on('keydown', (key) => {
            if (key.keyCode == 13) {


                write($('#message').val());
        
                
                // newMarker = {
                //     position: msgPos,
                //     map: map,
                // }
                // newMarker = new google.maps.Marker(e);
                // newMarker.setMap(map);

                // map.setCenter(msgPos);
            }
        });
    
        function write() {
            console.log($('#message').val());
            let comment = $('#message').val();
            let date = new Date();
            let
                h = date.getHours(),
                m = date.getMinutes(),
                s = date.getSeconds();
    
            h = h < 10 ? '0' + h : h;
            m = m < 10 ? '0' + m : m;
            s = s < 10 ? '0' + s : s;
    
            let timeNow = `${h}:${m}:${s}`;
    
            let pos;
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition( (position) => {
                    pos = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude,
                    }
                    // console.log(pos);
                    let marker = new google.maps.Marker({
                        position: pos,
                        map: map,
                        icon: icons[$('#pokemon').val()]
                    });
                    marker.setMap(map);

                    map.panTo(pos);
                    infoWindow = new google.maps.InfoWindow();
                    infoWindow.setPosition(pos);
                    infoWindow.setContent(comment);
                    infoWindow.open(map, marker);
                })
            }

            else {
              alert ("定位發生錯誤")
            }


            let postData = {
                name:userName.val(),
                content:message.val(),
                time:timeNow,
                id:'id'+ms
            };
          
    
            database.push(postData);
            message.val('');
        }
    
        function remove() {
            console.log("remove");
            database.remove();
            chat.html('');
        }

        database.once('value', (snapshot) => {
            chat.html('');

            // Tried to use snapshot.val().forEach, but it didnt work here.
            for (let i in snapshot.val()) {
                let c = snapshot.val()[i];
                chat.prepend(`<div><span>${c.time}</span> | ${c.name}: ${c.content}</div>`)

            }
        });
    
        database.limitToLast(1).on('value', (snapshot) => {
            for (let i in snapshot.val()) {
                let c = snapshot.val()[i];
                chat.prepend(`<div class="${c.id}"><span>${c.time} | </span>${c.name}: ${c.content}</div>`);
            }
        });

        sendButton.on('click', write);
        deleteButton.on('click', remove);
    });
} 

