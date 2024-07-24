#include <WiFiManager.h>          //https://github.com/tzapu/WiFiManager WiFi Configuration Magic

// create WifiManager object
WiFiManager wifiManager; 

//flag for saving data
bool shouldSaveConfig = false;

WiFiManagerParameter custom_text("<p>This is just a text paragraph</p>");

void setup() 
{

  wifiManager.setAPCallback(configModeCallback);

  //first parameter is name of access point, second is the password
  wifiManager.autoConnect("ProPutt", "puttingtest");

  wifiManager.setSaveConfigCallback(saveConfigCallback);
  wifiManager.setConfigPortalTimeout(180);
}

void loop() {


}

void configModeCallback (WiFiManager *myWiFiManager) {
  Serial.println("Entered config mode");
  Serial.println(WiFi.softAPIP());

  Serial.println(myWiFiManager->getConfigPortalSSID());
}

//if this is set, it will exit after config, even if connection is unsuccessful.
void setBreakAfterConfig(bool shouldBreak);

//callback notifying us of the need to save config
void saveConfigCallback () {
  Serial.println("Should save config");
  shouldSaveConfig = true;
}
