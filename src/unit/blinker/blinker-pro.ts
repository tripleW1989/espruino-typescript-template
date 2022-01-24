import { authOption, BlinkerDevice } from './blinker';

export class BlinkerProDevice extends BlinkerDevice {
    constructor(type: string, key: authOption) {
        super(type, key);
    }
}
