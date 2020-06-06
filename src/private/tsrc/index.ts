// external
import * as http from "http";
import { IncomingMessage, ServerResponse } from 'http';
import * as fs from 'fs';
import * as path from 'path';

// internal
import { setupSSE } from './sse';

const PORT_NUM = 8888;
const httpServer = http.createServer(requestResponseHandler);

httpServer.listen(PORT_NUM, () => {
  console.log(`[${new Date().toLocaleTimeString()}]: Node.JS server: http://localhost:${PORT_NUM}`);
});

function requestResponseHandler(request: IncomingMessage, response: ServerResponse) {
  console.log(`Request: ${new Date().toLocaleTimeString()}: ${request.url}`);
  switch (request.url) {
    case "/":
    case "index.html":
      sendResponse('index.html', 'text/html', response);
      break;
    case "/sse":
      setupSSE(request, response);
      break;
    default:
      sendResponse(request.url!, getContentType(request.url!), response);
  }
}

/**
 * Sends and ends response.
 * 
 * @param url 
 * @param contentType 
 * @param res 
 */
function sendResponse(url: string, contentType: string, res: ServerResponse) {
  let file = path.join(__dirname, "../../public",  url);

  fs.readFile(file, (err, content) => {
    if (err) {
      res.writeHead(404);
      res.write(`File '${file}' Not Found!`);
      res.end();
      console.log(`Response: 404 ${file}, ${err}`);
    } else {
      res.writeHead(200, { 'Content-Type': contentType });
      res.write(content);
      res.end();
      console.log(`Response: 200 ${file}`);
    }
  });
}

function getContentType(url: string) {
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
