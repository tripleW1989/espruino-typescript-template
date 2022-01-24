declare const process: Espruino.Process;

declare namespace Espruino {
    interface Process {
        env: Env;
        memory(): Memory;
    }

    interface Env {
        BOARD: string;
        VERSION: string;
        FLASH: string;
        RAM: string;
        MODULES: string;
    }
}
declare namespace http {
    /**
     * <p>Create an HTTP Server</p>
     * <p>When a request to the server is made, the callback is called. In the callback you can use the methods on the response (httpSRs) to send data. You can also add <code>request.on(&#39;data&#39;,function() { ... })</code> to listen for POSTed data</p>
     *
     * @param callback
     * @return
     * @url http://www.espruino.com/Reference#l_http_createServer
     */
    function request(option: any, callback: any): { on: any; end: any };
}
declare module global {
    SPI: any;
}
declare module 'DHT11' {
    function connect(pin: Pin): DHT11;

    interface DHT11 {
        read(callback: (response: DHTResponse) => void, repeatNum?: number);
    }

    interface DHTResponse {
        raw: string;
        rh: number;
        temp: number;
        err: boolean;
        checksumError: boolean;
    }
}

declare module 'Wifi' {
    function getAPIP(callback: any): void;
    function connect(ssid: string, options: Options, callback?: (err: null | string) => void): void;
    function startAP(ssid: string, options: ApOptions, callback: (err: Error) => AP): void;
    function getIP(callback: (err, ipinfo) => void): void;
    function setHostname(hostname: string, callback?: () => void): void;

    interface Options {
        password?: string;
        dnsServers?: Array<string>;
        channel?: number;
        bssid?: MacAddress;
    }

    type MacAddress = string;
}
