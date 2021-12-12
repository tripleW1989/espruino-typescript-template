/**
 * 管脚对应
    Sck（时钟引脚）连接 nodemcu 的 D5
    SDI（数据引脚）连接 nodemcu 的 D7
    DC（数据/命令引脚）连 D3
    CS（片选引脚）连 D8
    D6 可以连接有触摸功能的 tft
 */

// import * as ST7735 from "./ST7735";
type Types = {
  value: string;
  x?: number;
  y?: number;
  color?: number;
  fontSize?: number;
};
class Display {
  g;
  constructor() {
    // NodeMCU.D5.set(); // Backlight On
    const colorPalette = new Uint16Array([0, 0xf80f, 0x001f, 0xffff]);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const spi = new SPI();

    spi.setup({ mosi: NodeMCU.D7 /* sda */, sck: NodeMCU.D5 /* scl */ });
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    this.g = require('ST7735').connect(
      {
        palette: colorPalette,
        spi: spi,
        dc: NodeMCU.D3,
        cs: NodeMCU.D8,
        // height : 160 // optional, default=128
      },
      () => {
        this.display([{ value: "Init Success!" }]);
      }
    );
  }
  display(values: Types[]) {
    this.g.clear();
    values.map(({ color, fontSize, value, x, y }) => {
      console.log("value: ", value);
      this.g.setColor(color || 3);
      this.g.setFontVector(fontSize || 14);
      this.g.drawString(value, x || 0, y || 0);
    });

    this.g.flip(); //<--- Send to the display
  }
}
export default Display;
