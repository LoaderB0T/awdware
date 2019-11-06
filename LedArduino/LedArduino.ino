#include <FastLED.h>
#define NUM_LEDS 57
#define DATA_PIN 2
CRGB leds[NUM_LEDS];

void setup() {
  FastLED.addLeds<WS2812B, DATA_PIN>(leds, NUM_LEDS);
  for (int i = 0; i < NUM_LEDS; i++) {
    leds[i].setRGB(0, 0, 0);
  }
  FastLED.show();
  Serial.begin(115200);

  bool startCharFound = false;
  while (!startCharFound) {
    if (Serial.available()) {
      char c = Serial.read();
      Serial.println(c, DEC);
      if(c == 'z') {
        startCharFound = true;
      }
    }
    delay(20);
  }
}

int i = 0;
int coolDown = 0;
byte color_buffer[3];
bool hasReset = false;

void loop()
{
  while (Serial.available()) {
    coolDown = 0;
    hasReset = false;
    // get the new byte:
    Serial.readBytes(color_buffer, 3);

    leds[i].r = color_buffer[0];
    leds[i].g = color_buffer[1];
    leds[i].b = color_buffer[2];

    // Serial.print(color_buffer[0], DEC);
   //  Serial.print(color_buffer[1], DEC);
    // Serial.print(color_buffer[2], DEC);

    i++;
    if (i == NUM_LEDS) {
      i = 0;
      FastLED.show();
     //  Serial.write("s\n");
    }
  }
  // Serial.write("i\n");
  coolDown++;
  delay(1);
  if (coolDown > 5) {
    i = 0;
    if (!hasReset) {
      while (Serial.available()) {
        Serial.read();
      }
      hasReset = true;
    }
  }
  if (coolDown > 3000) {
    for (int i = 0; i < NUM_LEDS; i++) {
      leds[i].setRGB(0, 0, 0);
    }
    FastLED.show();
    i = 0;
    coolDown = 0;
    Serial.flush();
  }
}
