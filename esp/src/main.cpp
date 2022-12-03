#include <Arduino.h>
#include <WiFi.h>
#include <time.h>
#include <FirebaseESP32.h>
#include <TinyGPSPlus.h>

const char* ntpServer = "pool.ntp.org";
const long gmtOffset_sec = 10800; // GMT+3
const int  daylightOffset_sec = 0;

#define RX 9 // fourth from down left
#define TX 10 //unused

TinyGPSPlus gps;

 
#define us_to_s 1000000
#define TIME_TO_SLEEP 60 // in seconds
RTC_DATA_ATTR int wakeupCount = 0;


#define FIREBASE_HOST "atmosense-1645e-default-rtdb.europe-west1.firebasedatabase.app"
#define FIREBASE_AUTH "AhxQHb03V4cdg0J6nEXezH3LSePMRcVHjYVFL6FH"
#define API_KEY "AIzaSyDxFLdPFwjwUiI0EHwZvC0cRcEVmR0CiYs"
#define USER_EMAIL "itcs330project@gmail.com"
#define USER_PASSWORD "authenticationtime0841"

#define WIFI_SSID "Galaxy Note10 Lite8e6a"
#define WIFI_PASSWORD "gcvp0260"

FirebaseData firebaseData;
FirebaseJson json;
FirebaseAuth auth;
FirebaseConfig config;
String uid = "Jo9CMWsTaodaaJYdLLOwgt0Spw02";


const int BUFFER_SIZE = 17; // buffer for reading from 7 in 1
byte buf[BUFFER_SIZE];

float lat = 50.592466;
float lon = 26.250699;
int co; //mq-9 sensor
int co2;
int formaldahide;
int tvoc;
int pm25;
int pm10;
int temp;
int hum;
int checksum;
int calculated_checksum;
float temp_dec;
float hum_dec;
float total_temp;
float total_hum;
unsigned long Epoch_Time; 

void wifi_connect(){
  // Connect to wifi using credentials in secrets.h
  Serial.println("Connecting to Wifi.....");
  WiFi.mode(WIFI_STA);
  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
  while (WiFi.status() != WL_CONNECTED){
    delay(500);
    Serial.print(".");
  }
  Serial.println("Connected!");
}




unsigned long print_time(){
  struct tm timeinfo;
  time_t now;
  configTime(gmtOffset_sec, daylightOffset_sec, ntpServer);
  if (!getLocalTime(&timeinfo)){
    Serial.println("Failed to obtain time");
    return 0;
  }

  char timeHour[3];
  char timeMinute[3];
  char timeSec[3];
  char timeWeekDay[10];
  char dayOfMonth[3];
  char timeMonth[10];
  char timeYear[5];
  strftime(timeHour,3, "%H", &timeinfo);
  strftime(timeMinute,3, "%M", &timeinfo);
  strftime(timeSec,3, "%S", &timeinfo);
  strftime(dayOfMonth,10, "%d", &timeinfo);
  strftime(timeWeekDay,10, "%A", &timeinfo);
  strftime(timeMonth,10, "%B", &timeinfo);
  strftime(timeYear,10, "%Y", &timeinfo);  

  Serial.print(&timeinfo, "%A, %d %B %Y");
  Serial.print(" - ");
  Serial.print(&timeinfo, "%H:%M:%S");

  time(&now);
  
  return now;
}


void sm_sensor_read(){
  while(Serial1.available())
      Serial1.readBytes(buf, BUFFER_SIZE);

  //printing the raw bytes as hex -- debugging
  for(int i = 0; i < BUFFER_SIZE; i++){
      Serial.print(buf[i], HEX);
      Serial.print(" ");
  }
  Serial.println();

  for(int i = 0; i < BUFFER_SIZE; i++){
      Serial.print(buf[i]);
      calculated_checksum += buf[i];
      Serial.print(" ");
  }
  Serial.println();

  // start converting values
  co2 = buf[2] *256 + buf[3]; 
  formaldahide = buf[4] *256 + buf[5];
  tvoc = buf[6] *256 + buf[7];
  pm25 = buf[8]* 256 + buf[9]; 
  pm10 = buf[10]* 256 + buf[11]; 
  temp = buf[12];
  temp_dec = buf[13]*0.1;
  hum = buf[14];
  hum_dec = buf[15]*0.1;
  total_hum = hum + hum_dec;
  total_temp = temp + temp_dec;
  checksum = buf[16];
  calculated_checksum -= checksum;
  calculated_checksum = uint8_t(calculated_checksum);
}


void displayInfo()

{
  Serial.print(F("Location: "));

  if (gps.location.isValid()){
    // Serial.print("Lat: ");
    lat = gps.location.lat();
    // Serial.print(lat, 6);
    // Serial.print(F(","));
    // Serial.print("Lng: ");
    lon = gps.location.lng();
    // Serial.println();
  }  
  else
  {
    Serial.print(F("INVALID"));
  }
}

void get_coordinates(){
  while (Serial2.available() > 0)
    if (gps.encode(Serial2.read()))
      displayInfo();
  if (millis() > 5000 && gps.charsProcessed() < 10)
  {
    Serial.println(F("No GPS detected: check wiring."));
    while (true);
  }
}


void print_to_serial(){
  Serial.println("----------------------------------------------------------------------"); 
  Serial.print("Boot# ");
  Serial.println(wakeupCount);
  Serial.print("Date and Time"); 
  Epoch_Time = print_time();
  Serial.println();
  Serial.print("Lattitude: "); 
  Serial.println(lat, 6);
  Serial.print("Longitude: "); 
  Serial.println(lon, 6);
  Serial.print("CO: "); 
  Serial.println(co);
  Serial.print("CO2: "); 
  Serial.println(co2);
  Serial.print("Formaldahide: "); 
  Serial.println(formaldahide);
  Serial.print("TVOC: "); 
  Serial.println(tvoc);
  Serial.print("PM2.5: "); 
  Serial.println(pm25);
  Serial.print("PM10: "); 
  Serial.println(pm10);
  Serial.print("Temperature: "); 
  Serial.println(total_temp);
  Serial.print("Humidity: "); 
  Serial.println(total_hum);
  Serial.print("Checkum: "); 
  Serial.println(checksum);
  Serial.print("Calculated Checksum: ");
  Serial.println(calculated_checksum);
  Serial.println(); 

}


void send_to_firebase(){
  if (Firebase.setFloat (firebaseData, ("/air_parameters/temp_values/" + String(Epoch_Time) + "/co2"), co2)
  && Firebase.setFloat (firebaseData, ("/air_parameters/temp_values/" + String(Epoch_Time) + "/formaldahide"), formaldahide)
  && Firebase.setFloat (firebaseData, ("/air_parameters/temp_values/" + String(Epoch_Time) + "/hum"), total_hum)
  && Firebase.setFloat (firebaseData, ("/air_parameters/temp_values/" + String(Epoch_Time) + "/lat"), lat)
  && Firebase.setFloat (firebaseData, ("/air_parameters/temp_values/" + String(Epoch_Time) + "/lon"), lon)
  && Firebase.setFloat (firebaseData, ("/air_parameters/temp_values/" + String(Epoch_Time) + "/pm10"), pm10)
  && Firebase.setFloat (firebaseData, ("/air_parameters/temp_values/" + String(Epoch_Time) + "/pm25"), pm25)
  && Firebase.setFloat (firebaseData, ("/air_parameters/temp_values/" + String(Epoch_Time) + "/temp"), total_temp)
  && Firebase.setFloat (firebaseData, ("/air_parameters/temp_values/" + String(Epoch_Time) + "/counter"), 1)
  && Firebase.setFloat (firebaseData, ("/air_parameters/temp_values/" + String(Epoch_Time) + "/tvoc"), tvoc))

  {
    Serial.println("PASSED");
    Serial.println("------------------------------------");
    Serial.println();
  }
  else 
  {
    Serial.println("FAILED");
    Serial.println("REASON: " + firebaseData.errorReason());
    Serial.println("------------------------------------");
    Serial.println();
  }
}


void setup() {
  Serial.begin(9600);
  Serial1.begin(9600, SERIAL_8N1, RX, TX ); // serial for SM300D2
  Serial2.begin(9600); //gps serial
  
  wifi_connect();
  
  get_coordinates();
  sm_sensor_read();
  print_to_serial();
  ++wakeupCount;
  if (wakeupCount >1) // return back to >3
  {
    if (checksum !=0){
      if (calculated_checksum == checksum){
        config.api_key = API_KEY;
        auth.user.email = USER_EMAIL;
        auth.user.password = USER_PASSWORD;
        Firebase.begin(FIREBASE_HOST, FIREBASE_AUTH);
        Firebase.reconnectWiFi(true);
        send_to_firebase();
      }
      else {
        Serial.println("Incorrect Checksum");
      }
    }
    else {
      Serial.println("Zero readings");
    }
  }
  else{
    Serial.println("Not warmed up yet");
  }
  
  esp_sleep_enable_timer_wakeup(TIME_TO_SLEEP * us_to_s);
  Serial.println("GOING TO SLEEP");
  esp_deep_sleep_start();

}

void loop() {
}