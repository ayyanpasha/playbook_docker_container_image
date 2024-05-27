import WebSocket from 'ws';
import os from 'os';
import pty from 'node-pty';

const shell = os.platform() === 'win32' ? 'powershell.exe' : 'bash';
const wss = new WebSocket.Server({ port: 1000 });

wss.on('connection', function connection(ws) {
    let check = true;

    const ptyProcess = pty.spawn(shell, [], {
        name: 'xterm-color',
        cols: 80,
        rows: 30,
        cwd: process.env.HOME,
        env: process.env
    });

    console.log('Client connected');
    ptyProcess.onData((data) => {
        ws.send(data);
    });

    // Handle WebSocket messages
    ws.on('message', function incoming(message) {
        ptyProcess.write(message.toString());
    });

    // Handle WebSocket client disconnect
    ws.on('close', function close() {
        console.log('Client disconnected');
    });
});
