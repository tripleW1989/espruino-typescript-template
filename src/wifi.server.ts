import wifi from 'Wifi';
type CallBack = () => any;
type WifiOption = { name?: string; password?: string; callback?: CallBack; APCallback?: CallBack };
export default class Wifi {
    isConnect = false;
    ipInfo: any;
    constructor({ name, password, callback }: WifiOption) {
        this.connect(name, password, callback);
        Wifi.startAp();
    }
    connect(name = 'ChinaNet-Eqis', password = '2xhhnwws', callback?: CallBack): void {
        wifi.connect(name, { password }, (err: any) => {
            if (!err) {
                console.log('wifi connect success');
                this.isConnect = true;
                callback && callback();
            } else {
                console.log('wifi connect fail', err);
            }
        });
    }
    // 把自身作为一个 WiFi 热点

    static startAp(callback?: CallBack): void {
        wifi.startAP('EspruinoAP', { password: '12345678', authMode: 'wpa2' }, function (err) {
            console.log('startAP success!');
            if (err) {
                console.log('err', err);
            }
            callback && callback();
            wifi.getAPIP((err: any, ip: any) => {
                console.log('Connected!');
                console.log('err', err);
                console.log('ip', ip);
            });
        });
    }
}
