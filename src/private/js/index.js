"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// external
const http = require("http");
const fs = require("fs");
const path = require("path");
// internal
const sse_1 = require("./sse");
const PORT_NUM = 8888;
const httpServer = http.createServer(requestResponseHandler);
httpServer.listen(PORT_NUM, () => {
    console.log(`[${new Date().toLocaleTimeString()}]: Node.JS server: http://localhost:${PORT_NUM}`);
});
function requestResponseHandler(request, response) {
    console.log(`Request: ${new Date().toLocaleTimeString()}: ${request.url}`);
    switch (request.url) {
        case "/":
        case "index.html":
            sendResponse('index.html', 'text/html', response);
            break;
        case "/sse":
            sse_1.setupSSE(request, response);
            break;
        default:
            sendResponse(request.url, getContentType(request.url), response);
    }
}
/**
 * Sends and ends response.
 *
 * @param url
 * @param contentType
 * @param res
 */
function sendResponse(url, contentType, res) {
    let file = path.join(__dirname, "../../public", url);
    fs.readFile(file, (err, content) => {
        if (err) {
            res.writeHead(404);
            res.write(`File '${file}' Not Found!`);
            res.end();
            console.log(`Response: 404 ${file}, ${err}`);
        }
        else {
            res.writeHead(200, { 'Content-Type': contentType });
            res.write(content);
            res.end();
            console.log(`Response: 200 ${file}`);
        }
    });
}
function getContentType(url) {
    switch (path.extname(url)) {
        case '.html':
            return 'text/html';
        case '.css':
            return 'text/css';
        case '.js':
            return 'text/javascript';
        case '.json':
            return 'application/json';
        default:
            return 'application/octate-stream';
    }
}
//# sourceMappingURL=index.js.map