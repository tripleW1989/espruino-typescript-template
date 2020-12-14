export default class DHT11 {
  pin;
  watch: any;
  constructor(pin: Pin) {
    this.pin = pin;
  }
  read = (cb: any, n: any = 10) => {
    var d = "";

    digitalWrite(this.pin, 0);
    pinMode(this.pin, "output", true); // force pin state to output
    // start watching for state change
    this.watch = setWatch(
      (t) => {
        // @ts-ignore
        d += 0 | (t.time - t.lastTime > 0.00005);
      },
      this.pin,
      { edge: "falling", repeat: true }
    );
    // raise pulse after 1ms
    setTimeout(() => {
      pinMode(this.pin, "input_pullup", true);
      pinMode(this.pin, "output", true);
    }, 20);
    // stop looking after 50ms
    setTimeout(() => {
      if (this.watch) {
        this.watch = clearWatch(this.watch);
      }
      var cks =
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
  };
}
