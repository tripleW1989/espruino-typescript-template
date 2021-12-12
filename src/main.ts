// // @ts-nocheck
// import DHT11 from "./DHT11";
import LCD from './unit/LCD';
import DHT11 from './unit/DHT11';
import wifi from 'Wifi';
import http from 'http';

class Server {
  dht: DHT11;
  lcd: LCD;
  isConnect = false;
  lastTemp = 0;
  lastRh = 0;

  constructor() {
    console.log('i am here');
    this.dht = new DHT11(NodeMCU.D1);

    this.isConnect = false;
    this.startUp();
    setInterval(this.read, 5000);
  }

  sendTempAndRh = () => {
    const data = JSON.stringify({ temp: this.lastTemp, rh: this.lastRh });
    const options = {
      host: '192.168.1.10', // host name
      port: 5000, // (optional) port, defaults to 80
      path: '/', // path sent to server
      method: 'POST', // HTTP command sent to server (must be uppercase 'GET', 'POST', etc)
      protocol: 'http:', // optional protocol - https: or http:
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': data.length,
      },
    };
    const req = http.request(options, function (res: any) {
      res.on('data', function (data: string) {
        data = JSON.parse(data);
        console.log('data: ', data);
      });
      res.on('close', function (data: string) {
        console.log('Connection closed', data);
      });
    });
    req.on('error', function (e: Error) {
      console.log(e);
    });

    req.end(data);
  };

  read = () => {
    this.dht.read((dht) => {
      if (dht.err) {
        console.log(dht);
      } else {
        this.lastRh = dht.rh;
        this.lastTemp = dht.temp;
        if (this.isConnect) {
          // this.sendTempAndRh();
        }

        this.displayLastInfo();
      }
    });
  };
  displayLastInfo = () => {
    this.lcd.display([
      { value: `temp: ${this.lastTemp}` },
      { value: `rh: ${this.lastRh}`, y: 25 },
    ]);
  };
  startUp = () => {
    this.lcd = new LCD();
    wifi.connect('ChinaNet-ikbF', { password: 'k6cfrz7j' }, (err: any) => {
      if (!err) {
        console.log('wifi connect success');
        this.isConnect = true;
      } else {
        console.log('wifi connect fail');
      }
    });
  };
}
new Server();
