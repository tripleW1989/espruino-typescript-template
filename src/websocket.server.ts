import ws from 'ws';
type CallBack = (msg: string) => void;
export default class WebSocketServer {
    constructor(handler: CallBack) {
        this.startServer(handler);
    }
    startServer(handler: CallBack): void {
        const s = (ws as any).createServer(this.pageHandler);
        s.on('websocket', this.wsHandler(handler));
        s.listen(80);
    }

    // Page request handler
    pageHandler(req: any, res: any): void {
        this;
        res.writeHead(200, {
            'Content-Type': 'text/html'
        });
        res.end(`hello`);
    }

    // WebSocket request handler
    wsHandler =
        (handler: CallBack) => (ws: { on: (arg0: string, arg1: { (msg: any): void; (evt: any): void }) => void }) => {
            ws.on('open', function () {
                console.log('Connected to server');
            });
            ws.on('message', handler);
            ws.on('close', (_evt: any) => {
                console.log('bye bye');
            });
        };
}
