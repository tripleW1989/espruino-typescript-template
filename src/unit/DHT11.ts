export interface DHTResponse {
  raw: string;
  rh: number;
  temp: number;
  err?: boolean;
  checksumError?: boolean;
}
export default class DHT11 {
  pin;
  watch: any;
  constructor(pin: Pin) {
    this.pin = pin;
  }
  read(cb: (response: DHTResponse) => void, n = 10) {
    if (!n) n = 10;
    let d = "";

    digitalWrite(this.pin, 0);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    pinMode(this.pin, "output"); // force pin state to output
    // start watching for state change
    this.watch = setWatch(
      (t) => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        d += 0 | (t.time - t.lastTime > 0.00005);
      },
      this.pin,
      { edge: "falling", repeat: true }
    );
    // raise pulse after 1ms
    setTimeout(() => {
      pinMode(this.pin, "input_pullup", true);
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      pinMode(this.pin);
    }, 20);
    // stop looking after 50ms
    setTimeout(() => {
      if (this.watch) {
        clearWatch(this.watch);
        this.watch = null;
      }

      const cks =
        parseInt(d.substr(2, 8), 2) +
        parseInt(d.substr(10, 8), 2) +
        parseInt(d.substr(18, 8), 2) +
        parseInt(d.substr(26, 8), 2);
      if (cks && (cks & 0xff) == parseInt(d.substr(34, 8), 2)) {
        cb({
          raw: d,
          rh: parseInt(d.substr(2, 8), 2),
          temp: parseInt(d.substr(18, 8), 2),
        });
      } else {
        if (n > 1)
          setTimeout(() => {
            this.read(cb, --n);
          }, 500);
        else
          cb({ err: true, checksumError: cks > 0, raw: d, temp: -1, rh: -1 });
      }
    }, 100);
  }
}
