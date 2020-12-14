import DHT11 from "./DHT11";
import * as wifi from "Wifi";
interface DHT11Data {
  temp: any;
  rh: any;
}
const startUp = () => {
  const dht = new DHT11(NodeMCU.D1);
  let isConnect = false;

  var http = require("http");
  wifi.connect("ChinaNet-ikbF", { password: "k6cfrz7j" }, (err: any) => {
    if (!err) {
      isConnect = true;
    }
  });

  const sendTempAndRh = (temp: number, rh: number) => {
    if (rh < 50) {
      digitalWrite(NodeMCU.D6, 0);
      digitalWrite(NodeMCU.D7, 1);
    } else {
      digitalWrite(NodeMCU.D7, 0);
      digitalWrite(NodeMCU.D6, 1);
    }
    const data = JSON.stringify({ temp: temp, rh: rh });
    var options = {
      host: "192.168.1.10", // host name
      port: 5000, // (optional) port, defaults to 80
      path: "/", // path sent to server
      method: "POST", // HTTP command sent to server (must be uppercase 'GET', 'POST', etc)
      protocol: "http:", // optional protocol - https: or http:
      headers: {
        "Content-Type": "application/json",
        "Content-Length": data.length,
      },
    };
    var req = http.request(options, function (res: any) {
      res.on("data", function (data: string) {
        data = JSON.parse(data);
      });
      res.on("close", function (data: string) {
        console.log("Connection closed");
      });
    });
    req.on("error", function (e: Error) {
      console.log(e);
    });
    // You can req.write(...) here if your request requires data to be sent.

    req.end(data);
  };

  function readSensor() {
    dht.read((a: DHT11Data) => {
      sendTempAndRh(a.temp.toString(), a.rh.toString());
      setTimeout(readSensor, 5000);
    });
  }
  readSensor();
};
startUp();
