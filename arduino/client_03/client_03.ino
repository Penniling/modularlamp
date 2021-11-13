// https://github.com/khoih-prog/WebSockets_Generic/blob/master/examples/esp8266/ESP8266_WebSocketClientSocketIO/ESP8266_WebSocketClientSocketIO.ino

#include <Adafruit_NeoPixel.h>
#define PIN D8
Adafruit_NeoPixel pixels = Adafruit_NeoPixel(2, PIN, NEO_GRB + NEO_KHZ800);

#include <ESP8266WiFi.h>
#include <ESP8266WiFiMulti.h>

#include <ArduinoJson.h>

#include <WebSocketsClient_Generic.h>
#include <SocketIOclient_Generic.h>

#include <Hash.h>

ESP8266WiFiMulti WiFiMulti;
SocketIOclient socketIO;
IPAddress serverIP(192, 168, 2, 135);
uint16_t  serverPort = 8080;

void socketIOEvent(socketIOmessageType_t type, uint8_t * payload, size_t length) 
{
  Serial.println((char*) payload);
  switch (type) 
  {
    case sIOtype_DISCONNECT:
      Serial.println("[IOc] Disconnected");
      break;
    case sIOtype_CONNECT:
      Serial.print("[IOc] Connected to url: ");
      Serial.println((char*) payload);

      // join default namespace (no auto join in Socket.IO V3)
      socketIO.send(sIOtype_CONNECT, "/");
      
      break;
    case sIOtype_EVENT:
      Serial.print("[IOc] Get event: ");
      Serial.println((char*) payload);
      
      break;
    case sIOtype_ACK:
      Serial.print("[IOc] Get ack: ");
      Serial.println(length);
      
      hexdump(payload, length);
      break;
    case sIOtype_ERROR:
      Serial.print("[IOc] Get error: ");
      Serial.println(length);
      
      hexdump(payload, length);
      break;
    case sIOtype_BINARY_EVENT:
      Serial.print("[IOc] Get binary: ");
      Serial.println(length);
      
      hexdump(payload, length);
      break;
    case sIOtype_BINARY_ACK:
       Serial.print("[IOc] Get binary ack: ");
      Serial.println(length);
      
      hexdump(payload, length);
      break;
      
    default:
      break;  
  }
}

void setup() 
{
  pixels.begin();
  int led;
  for(led=0; led <=1; led++)
  {
    setColor(led,255,255,110); //red
  }
  pixels.show();

  
  // Serial.begin(921600);
  Serial.begin(115200);  
  while (!Serial);

  Serial.println("\nStart ESP8266_WebSocketClientSocketIO on " + String(ARDUINO_BOARD));
  Serial.println(WEBSOCKETS_GENERIC_VERSION);

  //Serial.setDebugOutput(true);

  // disable AP
  if (WiFi.getMode() & WIFI_AP) 
  {
    WiFi.softAPdisconnect(true);
  }

  WiFiMulti.addAP("BiedTown", "Egal-080913!");

  //WiFi.disconnect();
  while (WiFiMulti.run() != WL_CONNECTED)
  {
    Serial.print(".");
    delay(100);
  }

  Serial.println();

  // Client address
  Serial.print("WebSockets Client started @ IP address: ");
  Serial.println(WiFi.localIP());

  // server address, port and URL
  Serial.print("Connecting to WebSockets Server @ IP address: ");
  Serial.print(serverIP);
  Serial.print(", port: ");
  Serial.println(serverPort);

  // setReconnectInterval to 10s, new from v2.5.1 to avoid flooding server. Default is 0.5s
  socketIO.setReconnectInterval(10000);

  // server address, port and URL
  // void begin(IPAddress host, uint16_t port, String url = "/socket.io/?EIO=4", String protocol = "arduino");
  // To use default EIO=4 fron v2.5.1
  socketIO.begin(serverIP, serverPort);

  // event handler
  socketIO.onEvent(socketIOEvent);
}

unsigned long messageTimestamp = 0;

void loop() 
{
  socketIO.loop();

  uint64_t now = millis();

  if (now - messageTimestamp > 30000) 
  {
    messageTimestamp = now;

    // creat JSON message for Socket.IO (event)
    DynamicJsonDocument doc(1024);
    JsonArray array = doc.to<JsonArray>();

    // add evnet name
    // Hint: socket.on('event_name', ....
    array.add("data");

    // add payload (parameters) for the event
    JsonObject param1 = array.createNestedObject();
    param1["now"]     = (uint32_t) now;

    // JSON to String (serializion)
    String output;
    serializeJson(doc, output);

    // Send event
    socketIO.sendEVENT(output);

    // Print JSON for debugging
    Serial.println(output);
  }
}

void setColor(int led, int redValue, int greenValue, int blueValue)
{
  pixels.setPixelColor(led, pixels.Color(redValue, greenValue, blueValue)); 
}
