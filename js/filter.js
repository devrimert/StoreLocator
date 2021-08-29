function filterChange(){
    let sel = document.getElementById("storeType");
    let selValue= sel.options[sel.selectedIndex].text;
    for (i = 0; i < markers.length; i++) {
        console.log(markers[i]);
        if(selValue != "Show All"){
            if (markers[i].customType != selValue){
                markers[i].setVisible(false)
            }
            else{
                markers[i].setVisible(true);
            }
        }
        else{
            markers[i].setVisible(true)
        }

    }
}