var sendButton = document.getElementsByClassName("send")[0];
// var colorPicker = document.getElementsByClassName("color")[0];

var creds = JSON.stringify({
    "usr": "jannis",
    "pwd": "1234"
})

var ioc = io("ws://192.168.2.135:80", {query: "creds="+creds+""})

sendButton.addEventListener("click",() => {
    console.log("send")
    var color =  document.getElementById("color").value;
    ioc.emit("updateLamp", JSON.stringify({
        id: [1],
        color: ""+color+"",
        delay: 5
    }))
})
/*
{
    id: [*],
    color: "#000000";
    delay: 0

}
*/