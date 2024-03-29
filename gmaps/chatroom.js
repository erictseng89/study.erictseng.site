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
            url: "./images/600px-001Bulbasaur.png",
            scaledSize: new google.maps.Size(75, 75),
        },
        {
            url: "./images/600px-004Charmander.png",
            scaledSize: new google.maps.Size(75, 75),
        },
        {
            url: "./images/600px-007Squirtle.png",
            scaledSize: new google.maps.Size(75, 75),
        },
        {
            url: "./images/600px-054Psyduck.png",
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

        var markersArray = [];
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


                    markersArray.push(marker);
                    marker.setMap(map);
                    currentPos = pos;
                    map.panTo(pos);
                    infoWindow = new google.maps.InfoWindow();
                    infoWindow.setPosition(pos);
                    infoWindow.setContent(comment);
                    infoWindow.open(map, marker);

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




        function remove() {
            console.log("remove");
            database.remove();
            chat.html("");
        }

        const idSet = new Set();
        let idArray = new Array();
        database.once("value", (snapshot) => {
            chat.html("");

            // Tried to use snapshot.val().forEach, but it didnt work here.
            for (let i in snapshot.val()) {
                let c = snapshot.val()[i];
                let id = c.id
                // console.log(c);
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
                markersArray.push(marker);

                marker.setMap(map);
                infoWindow = new google.maps.InfoWindow();
                infoWindow.setPosition(pos);
                infoWindow.setContent(c.content);
                infoWindow.open(map, marker);
                if (!idSet.has(id)) {
                    idSet.add(id);
                    let newId = {
                        userId: id,
                        currentMarker: marker,
                        currentInfo: infoWindow,
                        currentPokemon: c.pokemon,
                    }
                    idArray.push(newId);

                } else {
                    for (let i = 0; i < idArray.length; i++) {
                        if (idArray[i].userId == id) {
                            idArray[i].currentMarker.setMap(null);
                            idArray[i].currentInfo.close();
                            idArray[i].currentInfo = infoWindow;
                            break;
                        }
                    }
                }

                chat.prepend(
                    `<div><span>${c.time}</span> | ${c.name}: ${c.content}</div>`
                );
            }
        });

        database.limitToLast(1).on("value", (snapshot) => {
            for (let i in snapshot.val()) {
                let c = snapshot.val()[i];
                let id = c.id
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
                markersArray.push(marker);

                // markersArray.push(marker);
                marker.setMap(map);
                infoWindow = new google.maps.InfoWindow();
                infoWindow.setPosition(pos);
                infoWindow.setContent(c.content);
                infoWindow.open(map, marker);
                if (!idSet.has(id)) {
                    idSet.add(id);
                    let newId = {
                        userId: id,
                        currentMarker: marker,
                        currentInfo: infoWindow,
                        currentPokemon: c.pokemon,
                    }
                    idArray.push(newId);

                } else {
                    for (let i = 0; i < idArray.length; i++) {
                        if (idArray[i].userId == id) {
                            idArray[i].currentMarker.setMap(null);
                            idArray[i].currentInfo.close();
                            idArray[i].currentInfo = infoWindow;
                            break;
                        }
                    }
                }
                // console.log(idSet);
                // console.log(idArray);
                chat.prepend(
                    `<div class="${c.id}"><span>${c.time} | </span>${c.name}: ${c.content}</div>`
                );
            };
        });

        function deleteInfo() {
            markersArray.forEach((a) => {
                a.setMap(null);
            })
            infoArray.forEach((a) => {
                a.close();
            });
        };
        sendButton.on("click", write);
        // deleteButton.on("click", remove);
        deleteButton.on("click", deleteInfo);
    });
}