// // @ts-nocheck
// import DHT11 from "./DHT11";
import LCD from "./unit/LCD";
import DHT11 from "./unit/DHT11";
import wifi from "Wifi";
import http from "http";

class Server {
    dht: DHT11;
    lcd: LCD;
    isConnect = false;
    lastTemp = 0;
    lastRh = 0;

    constructor() {}

    startUp = () => {};
}
new Server();
