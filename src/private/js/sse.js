"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupSSE = (req, res) => {
    res.writeHead(200, {
        'Content-Type': 'text/event-stream',
    });
    const ivID = setInterval(function () {
        const x = Date.now();
        const y = Math.random() * 100;
        const data = JSON.stringify({ x: x, y: y });
        res.write('data: ' + data + '\n\n');
    }, 5000);
    req.on('end', function () {
        console.log(`${Date.now()}: Ending connection.`);
        clearInterval(ivID);
    });
};
//# sourceMappingURL=sse.js.map