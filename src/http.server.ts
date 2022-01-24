import http from 'http';
export default class HttpServer {
    constructor() {
        console.log('start http server ing');
        this.startUp();
    }
    pageRequest(req: http.IncomingMessage, res: http.ServerResponse) {
        const a = url.parse(req.url, true);
        res.writeHead(200);
        res.end(a);
        this;
    }
    startUp(): void {
        // 2. 使用 http.createServer() 方法创建一个 Web 服务器
        //    返回一个 Server 实例

        http.createServer(this.pageRequest).listen(3000); // port 8080
    }
}
