#include <SPI.h>
#include "LedMatrix.h"


#define NUMBER_OF_DEVICES 6
#define CS_PIN 10
LedMatrix ledMatrix = LedMatrix(NUMBER_OF_DEVICES, CS_PIN);
int x = 0;
String ReaderFromNode="Hello Node";
String data="Hello";

void setup() {
  Serial.begin(9600);
  ledMatrix.init();

  ledMatrix.setText("Demo");
  ledMatrix.setNextText("Initing...");
}

void loop(){

     if(Serial.available() > 0) // Read from serial port
    {
      // Store current character
      data=Serial.readString();
      ledMatrix.setNextText(data);
      //convertToState(ReaderFromNode); // Convert character to state
    }
  if(data.startsWith("$Smile")){

    ledMatrix.setNextText(":)");
    ledMatrix.clear();
    ledMatrix.scrollTextLeft();
    ledMatrix.drawText();
    ledMatrix.commit();
    delay(50);

  }else if(data.startsWith("$Sad")){

    ledMatrix.setNextText(":(");
    ledMatrix.clear();
    ledMatrix.scrollTextLeft();
    ledMatrix.drawText();
    ledMatrix.commit();
    delay(50);

  }else{

    ledMatrix.clear();
    ledMatrix.scrollTextLeft();
    ledMatrix.drawText();
    ledMatrix.commit();
    delay(50);

  }


}
