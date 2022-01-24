import { BlinkerDevice } from './unit/blinker/blinker';
export class Blinker {
    private device: BlinkerDevice;
    constructor(auth: string) {
        this.setup(auth);
    }
    setup(auth: string) {
        this.device = new BlinkerDevice(auth, {});

        // Button1.attach(button1_callback);
    }
    getDevice() {
        return this.device;
    }
}
