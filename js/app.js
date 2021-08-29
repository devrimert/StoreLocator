let map, infoWindow, geocoder;
let currentPosMarker, removeProcess = false;
function initMap() {
    map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: 38.41892519740545, lng: 27.12868926928171},
        zoom: 12
    });
    getCurrentLocation();
    geocoder = new google.maps.Geocoder();
    document.getElementById("deletePlaceBtn").addEventListener("click", removeMarkerBtn);
    document.getElementById("editPlaceBtn").addEventListener("click", editMarkerBtn);
}

function markersOnClick(marker){
    if(removeProcess != true){
        showMarkerCard(marker)
    }
    else{
        marker.setMap(null);
        removeProcess = false;
        const index = markers.indexOf(marker);
        if (index > -1){
            markers.splice(index,1);
        }
        console.log(markers);
    }
}
function editMarkerBtn() {
    for (i = 0; i < markers.length; i++) {
        checkDraggablety(markers[i]);
        markers[i].setOptions({draggable: true});
        google.maps.event.addListener(markers[i], 'dragend', function() {
            for (i = 0; i < markers.length; i++) {
                checkDraggablety(markers[i])
            }} );
    }
}
function checkDraggablety(marker){
        console.log(marker);
        if(marker != null){
            marker.setOptions({draggable: false});
        }
}
function getCurrentLocation(){
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const pos = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                };
                console.log("Location Found");
                console.log(pos);
                map.setCenter(pos);
                map.zoom = 12;
                const im = 'http://www.robotwoods.com/dev/misc/bluecircle.png'
                currentPosMarker = new google.maps.Marker({
                    position: pos,
                    map,
                    title: "Current Location",
                    icon: im,
                    clickable: false,
                });
            },
            () => {
                handleLocationError(true, infoWindow, map.getCenter());
            }
        );
    } else {
        // Browser doesn't support Geolocation
        handleLocationError(false, infoWindow, map.getCenter());
    }
}
function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    browserHasGeolocation
        ? console.log("Error: The Geolocation service failed.")
        : console.log("Error: Your browser doesn't support geolocation.")
    console.log("Map center setted as Izmir Clock Tower.")
    currentPosMarker = new google.maps.Marker({
        position: map.center,
        map,
        title: "Clock Tower",
    });
}


