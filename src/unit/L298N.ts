const LOW = 0;
const HIGH = 1;
export default class L298N {
    IN1: Pin;
    IN2: Pin;
    IN3: Pin;
    IN4: Pin;
    constructor(IN1 = NodeMCU.D1, IN2 = NodeMCU.D2, IN3 = NodeMCU.D3, IN4 = NodeMCU.D4) {
        this.init(IN1, IN2, IN3, IN4);
    }
    init(IN1: Pin, IN2: Pin, IN3: Pin, IN4: Pin) {
        this.IN1 = IN1;
        this.IN2 = IN2;
        this.IN3 = IN3;
        this.IN4 = IN4;

        pinMode(this.IN1, "output", true);
        pinMode(this.IN2, "output", true);
        pinMode(this.IN3, "output", true);
        pinMode(this.IN4, "output", true);
    }
    forward() {
        digitalWrite(this.IN1, LOW);
        digitalWrite(this.IN2, HIGH);   //IN1和IN2控制一端向前转动
        digitalWrite(this.IN3, LOW);
        digitalWrite(this.IN4, HIGH);   //IN3和IN4控制另外一端向前转动
        // delay(100);
    }
    back() {
        digitalWrite(this.IN1, HIGH);
        digitalWrite(this.IN2, LOW);   //IN1和IN2控制一端向前转动
        digitalWrite(this.IN3, HIGH);
        digitalWrite(this.IN4, LOW);   //IN3和IN4控制另外一端向前转动
        // delay(100);
    }
    stop() {
        digitalWrite(this.IN1, LOW);
        digitalWrite(this.IN2, LOW);   //IN1和IN2控制一端向前转动
        digitalWrite(this.IN3, LOW);
        digitalWrite(this.IN4, LOW);   //IN3和IN4控制另外一端向前转动
        // delay(100);
    }
    left() {
        // 左转
        digitalWrite(this.IN1, LOW);
        digitalWrite(this.IN2, HIGH);   //IN1和IN2控制一端向前转动
        digitalWrite(this.IN3, HIGH);
        digitalWrite(this.IN4, LOW);   //IN3和IN4控制另外一端向前转动
    }

    right() {
        digitalWrite(this.IN1, HIGH);
        digitalWrite(this.IN2, LOW);   //IN1和IN2控制一端向前转动
        digitalWrite(this.IN3, LOW);
        digitalWrite(this.IN4, HIGH);   //IN3和IN4控制另外一端向前转动
    }
}
