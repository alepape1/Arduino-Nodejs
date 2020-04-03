const express = require('express');
const app = express();
var SerialPort = require("serialport");
const request = require("request-promise");

const RUTA = "https://coronavirus-tracker-api.herokuapp.com/all";
const WeatherAPI ="http://api.openweathermap.org/data/2.5/forecast?id=2515270&APPID=4a26b838ed6fb86d9587aa40af5ca8ad"

var port = 3000;

var arduinoCOMPort = "COM4";

var arduinoSerialPort = new SerialPort(arduinoCOMPort, {
 baudRate: 9600
});

arduinoSerialPort.on('open',function() {
  console.log('Serial Port ' + arduinoCOMPort + ' is opened.');
});

app.get('/', function (req, res) {

    return res.send('Working');

})

app.get('/:action', function (req, res) {

   var action = req.params.action || req.param('action');

    if(action == 'led'){
        arduinoSerialPort.write("encendido");
        return res.send('Led light is on!');
    }
    if(action == 'off') {
        arduinoSerialPort.write("apagado");
        return res.send("Led light is off!");
    }
    if(action == 'covid') {
        arduinoSerialPort.write("requesting users...");
        request({
            uri: RUTA,
            json: true, // Para que lo decodifique automáticamente
        }).then(data => {

                console.log(`Confirmed: ${data.confirmed.latest} Deaths: ${data.deaths.latest} Recovery: ${data.recovered.latest}`);
                arduinoSerialPort.write(`Confirmed: ${data.confirmed.latest} Deaths: ${data.deaths.latest} Recovery: ${data.recovered.latest}`);
                res.send(`Confirmed: ${data.confirmed.latest} Deaths: ${data.deaths.latest} Recovery: ${data.recovered.latest}`)

        });
      return true
    }
    if(action == 'temp') {

        request({
            uri: WeatherAPI,
            json: true, // Para que lo decodifique automáticamente
        }).then(data => {
              var temp = Math.round(data.list[0].main.temp - 273);
                console.log(temp);
                arduinoSerialPort.write('T :'+temp.toString()+'C');
                res.send(temp.toString())

        });
      return true
    }
    if(action == 'wind') {

        request({
            uri: WeatherAPI,
            json: true, // Para que lo decodifique automáticamente
        }).then(data => {
              var windSpeed = Math.round(data.list[0].wind.speed);
              var windDeg= Math.round(data.list[0].wind.deg);
                console.log(`The wind speed is:${windSpeed} and the direction is ${windDeg}`);
                arduinoSerialPort.write(`Speed :${windSpeed.toString()} Deg:${windDeg.toString()}`);
                res.send(`The wind speed is:${windSpeed.toString()} and the direction is ${windDeg.toString()}`)

        });
      return true
    }    if(action == 'smile') {

          console.log("Showing Smile icons :)")
          arduinoSerialPort.write("$Smile");

          return true
        }

    return res.send('Action: ' + action);

});

app.listen(port, function () {

  request({
      uri: WeatherAPI,
      json: true, // Para que lo decodifique automáticamente
  }).then(data => {
        var temp = Math.round(data.list[0].main.temp - 273);
          console.log(temp);
          arduinoSerialPort.write('T :'+temp.toString()+'C');


  });

  console.log('Example app listening on port http://0.0.0.0:' + port + '!');
});
