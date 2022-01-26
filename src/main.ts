import WebSocketServer from './websocket.server';
import Wifi from './wifi.server';
import Driver from './unit/L298N';
class Server {
    driver: Driver;
    server: WebSocketServer;
    wifi: Wifi;
    auth = '2dcdd31adcec';
    ssid = 'ChinaNet-Eqis';
    password = '2xhhnwws';

    constructor() {
        console.log('server start');
        this.startUp();
    }
    handler = (msg: string): void => {
        console.log(this.driver);
        switch (msg) {
            case 'right':
                this.driver.right();
                break;
            case 'left':
                this.driver.left();
                break;
            case 'forward':
                this.driver.forward();
                break;
            case 'stop':
                this.driver.stop();
                break;
            default:
                break;
        }
    };

    startUp = () => {
        this.driver = new Driver();

        // 连接 WIFI
        Wifi.startAp(() => {
            this.server = new WebSocketServer(this.handler);
        });
    };
}
new Server();
