// Seleting navbar Section
var menu = document.getElementById("menubtn")
var canclebar = document.getElementById("xcancle")

menu.addEventListener("click", function () {
    var sidebar = document.getElementById("sidebar")
    sidebar.style.left = "0"
})

canclebar.addEventListener("click", function () {
    var sidebar = document.getElementById("sidebar")
    sidebar.style.left = "-60%"
})

// Popup Message

var popupbtn = document.getElementById("popup_btn")

popupbtn.addEventListener("click",function(){
    var popupcontainer =  document.getElementById("popup_container")
    popupcontainer.style.display = "None"
})

