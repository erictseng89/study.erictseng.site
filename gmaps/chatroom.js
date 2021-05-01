// firebase

// Must use var instead of let here.
var firebase;

function initMap() {
    map = new google.maps.Map(document.getElementById("map"), {
        center: {
            lat: 24.136813,
            lng: 120.68523
        },
        zoom: 14,
    });

    const icons = [{
            url: "https://archives.bulbagarden.net/media/upload/thumb/2/21/001Bulbasaur.png/600px-001Bulbasaur.png",
            scaledSize: new google.maps.Size(75, 75),
        },
        {
            url: "https://cdn2.bulbagarden.net/upload/thumb/7/73/004Charmander.png/600px-004Charmander.png",
            scaledSize: new google.maps.Size(75, 75),
        },
        {
            url: "https://cdn2.bulbagarden.net/upload/thumb/3/39/007Squirtle.png/600px-007Squirtle.png",
            scaledSize: new google.maps.Size(75, 75),
        },
        {
            url: "https://cdn2.bulbagarden.net/upload/thumb/5/53/054Psyduck.png/600px-054Psyduck.png",
            scaledSize: new google.maps.Size(75, 75),
        },
    ];


    $(() => {
        let userName = $("#name"),
            pokemon = $("#pokemon"),
            message = $("#message"),
            sendButton = $("#sendButton"),
            deleteButton = $("#deleteButton"),
            chat = $("#chatContents"),
            ms = new Date().getTime();

        var config = {
            databaseURL: "https://maps-chatbox-default-rtdb.firebaseio.com/",
        };

        firebase.initializeApp(config);
        let database = firebase.database().ref();

        message.on("keypress", (key) => {
            if (key.keyCode == 13) {
                write($("#message").val());
            }
        });

        // var markersArray = [];
        var infoArray = [];

        function write() {

            let comment = $("#message").val();
            let date = new Date();
            let h = date.getHours(),
                m = date.getMinutes(),
                s = date.getSeconds();

            h = h < 10 ? "0" + h : h;
            m = m < 10 ? "0" + m : m;
            s = s < 10 ? "0" + s : s;

            let timeNow = `${h}:${m}:${s}`;

            var currentPos;
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition((position) => {
                    pos = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude,
                    };
                    // console.log(pos.lat);
                    let marker = new google.maps.Marker({
                        position: pos,
                        map: map,
                        icon: icons[$("#pokemon").val()],
                    });
                    markersArray = [];

                    markersArray.push(marker);
                    marker.setMap(map);
                    currentPos = pos;
                    map.panTo(pos);
                    infoWindow = new google.maps.InfoWindow();
                    infoWindow.setPosition(pos);
                    infoWindow.setContent(comment);
                    infoWindow.open(map, marker);

                    deleteInfo();
                    infoArray.push(infoWindow);

                    let latitude = currentPos.lat;
                    let longitude = currentPos.lng;
                    // console.log(currentPos + latitude + longitude);

                    let postData = {
                        name: userName.val(),
                        pokemon: pokemon.val(),
                        content: message.val(),
                        time: timeNow,
                        lat: latitude,
                        lng: longitude,
                        id: "id" + ms,
                    };

                    database.push(postData);
                    message.val("");
                    message.blur();
                });
            } else {
                alert("定位發生錯誤");
            }

            // console.log(currentPos);
            // let postData = {
            //     name: userName.val(),
            //     content: message.val(),
            //     time: timeNow,
            //     id: "id" + ms,
            // };

            // database.push(postData);
            // message.val("");
            // message.blur();
        }

        function deleteInfo() {
            infoArray.forEach((a) => {
                a.close();
            });
        };


        function remove() {
            console.log("remove");
            database.remove();
            chat.html("");
        }

        database.once("value", (snapshot) => {
            chat.html("");

            // Tried to use snapshot.val().forEach, but it didnt work here.
            for (let i in snapshot.val()) {
                let c = snapshot.val()[i];
                console.log(c);
                pos = {
                    lat: c.lat,
                    lng: c.lng,
                };
                // console.log(pos.lat);
                let marker = new google.maps.Marker({
                    position: pos,
                    map: map,
                    icon: icons[c.pokemon],
                });
                // markersArray = [];

                // markersArray.push(marker);
                marker.setMap(map);
                infoWindow = new google.maps.InfoWindow();
                infoWindow.setPosition(pos);
                infoWindow.setContent(c.content);
                infoWindow.open(map, marker);
                chat.prepend(
                    `<div><span>${c.time}</span> | ${c.name}: ${c.content}</div>`
                );
            }
        });

        database.limitToLast(1).on("value", (snapshot) => {
            for (let i in snapshot.val()) {
                let c = snapshot.val()[i];
                pos = {
                    lat: c.lat,
                    lng: c.lng,
                };
                // console.log(pos.lat);
                let marker = new google.maps.Marker({
                    position: pos,
                    map: map,
                    icon: icons[c.pokemon],
                });
                // markersArray = [];

                // markersArray.push(marker);
                marker.setMap(map);
                infoWindow = new google.maps.InfoWindow();
                infoWindow.setPosition(pos);
                infoWindow.setContent(c.content);
                infoWindow.open(map, marker);
                chat.prepend(
                    `<div class="${c.id}"><span>${c.time} | </span>${c.name}: ${c.content}</div>`
                );
            }
        });

        sendButton.on("click", write);
        deleteButton.on("click", remove);
    });
}