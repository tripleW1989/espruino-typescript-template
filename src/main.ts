// import { Blinker } from './blinker.server';
import HttpServer from './http.server';
import Wifi from './wifi.server';

class Server {
    wifi: Wifi;
    httpServer: HttpServer;
    // blinker: Blinker;
    // auth = '2dcdd31adcec';
    // ssid = 'ChinaNet-Eqis';
    // password = '2xhhnwws';

    constructor() {
        console.log('server start');
        // this.startUp();
        Wifi.startAp(() => {
            this.httpServer = new HttpServer();
        });
    }

    startUp = () => {
        // 连接 WIFI
        this.wifi = new Wifi({
            callback: () => {
                this.httpServer = new HttpServer();
            }
        });
    };
}
new Server();
