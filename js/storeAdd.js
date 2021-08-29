var marker;
var infowindow = null;
var markers = [];
function addMarkerBtn(){
    checkDraggablety(marker);
    google.maps.event.addListener(map, 'click', function(event) {
        placeMarker(event.latLng);
    });
}
function geocodeToAddress(geocode, addressLoc){
    geocoder
        .geocode({ location: geocode })
        .then((response) => {
            if (response.results[0]) {
                addressLoc = response.results[0].formatted_address.toString();
                console.log(addressLoc);
                document.getElementById("adress").innerText = addressLoc;
            } else {
                window.alert("No results found");
                addressLoc = "No results found"
            }
        })
        .catch((e) => {window.alert("Geocoder failed due to: " + e); addressLoc ="Geocoder failed" });
}

function placeMarker(location) {
     marker = new google.maps.Marker({
         animation: google.maps.Animation.DROP,
        position: location,
        map: map,
    });
     let markerLat = (Math.round(marker.position.lat()*1000)) /1000;
     let markerLng = (Math.round(marker.position.lng()*1000)) /1000;
     const latlng = {
        lat: parseFloat(marker.position.lat().toString()),
        lng: parseFloat(marker.position.lng().toString()),
    };
    console.log(latlng);
    geocodeToAddress(latlng);
    google.maps.event.clearListeners(map,'click');
    const contentString =
        '<div id="content">' +
        '<div id="siteNotice">' +
        "</div>" +
        '<h3 id="firstHeading" class="firstHeading">New Location</h3>' +
        '<h4 id="coords" class="firstHeading">'+markerLat + ' - ' + markerLng+ '</h4>' +
        '<h5 id="adress" class="firstHeading"></h5>' +
        '<div id="bodyContent">' +
       "<label for=\"sName\">Name:</label>\n" +
        "<input type=\"text\" id=\"sName\" name=\"sName\"><br><br>" +
        "<label for=\"sType\">Type:</label>\n" +
        "<select id=\"sType\">" +
        "<option value=\"restaurant\">Restaurant</option>\n" +
        "<option value=\"shop\">Shop</option>\n" +
        "<option value=\"cafe\">Cafe</option>\n" +
        "<option value=\"bar\">Bar</option>\n" +
        "<option value=\"pub\">Pub</option>\n" +
        "<option value=\"lounge\">Lounge</option>\n" +
        "<option value=\"patisserie\">Patisserie</option>" +
        "</select>    "+
        "</div> <br>" +
        "<button onclick=\"formOnOk()\">  Okey  </button>  "+
        "<button onclick=\"formOnCancel(marker)\">  Cancel  </button>"+
        "</div>";
    if (infowindow) {
        infowindow.close();
    }
     infowindow = new google.maps.InfoWindow({
        content: contentString,
    });
    infowindow.open({
     anchor: marker,
     map,
     shouldFocus: false,
    })

    google.maps.event.addListener(marker, 'click', function() {
        markersOnClick(this);
    });
}
function formOnOk(){
    console.log("Ok clicked");
    let sel = document.getElementById("sType");
    let name = document.getElementById("sName");
    let markercoords = document.getElementById("coords");
    let markerAdress = document.getElementById("adress");
    let selValue= sel.options[sel.selectedIndex].text;
    let nameValue = name.value;
    let markercoordsValue = markercoords.innerText;
    let markerAdressValue =  markerAdress.innerText;
    if(nameValue != ""){
        marker.customType = selValue;
        marker.customID = markers.length +1;
        marker.customName = nameValue;
        marker.customCoords= markercoordsValue;
        marker.customAdress = markerAdressValue;
        console.log(marker);
        markers.push(marker);
        showMarkerCard(marker);
    }
   else{
       alert("Please enter a name for place")
    }
}
function formOnCancel(marker){
    marker.setMap(null);
    if (infowindow) {
        infowindow.close();
    }

}
function showMarkerCard(marker){
    if (infowindow) {
        infowindow.close();
    }
    const contentString =
        '<div >' +
        '<div>' +
        "</div>" +
        '<h3 id="firstHeading" class="firstHeading">'+marker.customName+'</h3>' +
        '<h4 id="coords" class="firstHeading">'+marker.customCoords + '</h4>' +
        '<h5 id="adress" class="firstHeading"> '+ marker.customAdress+'</h5>' +
        '<div id="bodyContent">' +
        "</div> <br>" +
        "</div>";
    infowindow = new google.maps.InfoWindow({
        content: contentString,
    });
    infowindow.open({
        anchor: marker,
        map,
        shouldFocus: false,
    })
}






