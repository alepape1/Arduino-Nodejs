# Arduino-Nodejs

Server in Nodejs for Arduino Serial comunication. Created a server to controll the arduino by Serial Port .
(Make sure that you change your Serial port on the code). Start the server and open the index.html file, You will find four buttons,
Some of them are checking by HTTP GET resquest the weather in a API and the Covid-19 status situacion updated. It is just a example, you
can user your favorite API to get the information on the Matrix LED.


# Requirements

You need a Arduino with a Matrix Led 8x8 with the MAX7219 Driver

You need Node and npm installed on your computer

You need to install with npm :

```
npm install serialport
npm install express
npm install request 
npm install request-promise
```
