"use strict";function t(t){return t&&typeof t==="object"&&"default"in t?t["default"]:t}var e=t(require("Wifi"));var n=function(){function t(){var t=this;var e=new Uint16Array([0,63503,31,65535]);var n=new SPI;n.setup({mosi:NodeMCU.D7,sck:NodeMCU.D5});this.g=require("ST7735").connect({palette:e,spi:n,dc:NodeMCU.D3,cs:NodeMCU.D8},(function(){t.display([{value:"Init Success!"}])}))}t.prototype.display=function(t){var e=this;this.g.clear();t.map((function(t){var n=t.color,i=t.fontSize,s=t.value,o=t.x,r=t.y;console.log("value: ",s);e.g.setColor(n||3);e.g.setFontVector(i||14);e.g.drawString(s,o||0,r||0)}));this.g.flip()};return t}();var i=function(){function t(t){this.pin=t}t.prototype.read=function(t,e){var n=this;if(e===void 0){e=10}if(!e)e=10;var i="";digitalWrite(this.pin,0);pinMode(this.pin,"output");this.watch=setWatch((function(t){i+=0|t.time-t.lastTime>5e-5}),this.pin,{edge:"falling",repeat:true});setTimeout((function(){pinMode(n.pin,"input_pullup");pinMode(n.pin)}),20);setTimeout((function(){if(n.watch){clearWatch(n.watch);n.watch=null}var s=parseInt(i.substr(2,8),2)+parseInt(i.substr(10,8),2)+parseInt(i.substr(18,8),2)+parseInt(i.substr(26,8),2);if(s&&(s&255)==parseInt(i.substr(34,8),2)){t({raw:i,rh:parseInt(i.substr(2,8),2),temp:parseInt(i.substr(18,8),2)})}else{if(e>1)setTimeout((function(){n.read(t,--e)}),500);else t({err:true,checksumError:s>0,raw:i,temp:-1,rh:-1})}}),100)};return t}();var s=require("http");var o=function(){function t(){var t=this;this.isConnect=false;this.lastTemp=0;this.lastRh=0;this.sendTempAndRh=function(){var e=JSON.stringify({temp:t.lastTemp,rh:t.lastRh});var n={host:"192.168.1.10",port:5e3,path:"/",method:"POST",protocol:"http:",headers:{"Content-Type":"application/json","Content-Length":e.length}};var i=s.request(n,(function(t){t.on("data",(function(t){t=JSON.parse(t);console.log("data: ",t)}));t.on("close",(function(t){console.log("Connection closed",t)}))}));i.on("error",(function(t){console.log(t)}));i.end(e)};this.read=function(){t.dht.read((function(e){if(e.err){console.log(e)}else{t.lastRh=e.rh;t.lastTemp=e.temp;if(t.isConnect);t.displayLastInfo()}}))};this.displayLastInfo=function(){t.lcd.display([{value:"temp: "+t.lastTemp},{value:"rh: "+t.lastRh,y:25}])};this.startUp=function(){t.lcd=new n;e.connect("ChinaNet-ikbF",{password:"k6cfrz7j"},(function(e){if(!e){console.log("wifi connect success");t.isConnect=true}else{console.log("wifi connect fail")}}))};console.log("i am here");this.dht=new i(NodeMCU.D1);this.isConnect=false;this.startUp();setInterval(this.read,5e3)}return t}();new o;
