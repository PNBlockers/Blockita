var counterA = [];
var counterB = [];


// basic functionalities
$(document).ready(() => {
    const client = mqtt.connect("wss://test.mosquitto.org:8081/mqtt")
    client.on("connect", () => {
        console.log("Successfully connected to ");
    })
    //subscribe to hardware
    data = ["blockita1", "blockita2", "blockita3", "blockita4"]

    // jQuery.each(data, function (i, val) {
    //     client.subscribe(val)
    // });
    for(var i=0;i<data.length;i++){
        client.subscribe(data[i])
    }
    // client.subscribe("blockita1")
    //client.subscribe("$SYS/#")


    client.on("message", (topic, payload) => {
        console.log(payload)
        if (topic == "blockita1") {
            counterA.push(topic);
            let total = counterA.length
            $("#blockita1").text(total);
            console.log(counterA)
            var row = "<tr><td>" + payload + "</td><td>" + moment().format('MMMM Do YYYY, h:mm:ss a') + "</td></tr>";
            $("#tbBlock1").append(row);
            console.log("Received { topic: " + topic + "; payload: " + payload + " }");
        }
        if (topic == "blockita2") {
            counterB.push(topic);
            let total = counterB.length
            $("#blockita2").text(total);
            console.log(counterB)
            var row = "<tr><td>" + payload + "</td><td>" + moment().format('MMMM Do YYYY, h:mm:ss a') + "</td></tr>";
            $("#tbBlock2").append(row);
            console.log("Received { topic: " + topic + "; payload: " + payload + " }");
        }

    })


})