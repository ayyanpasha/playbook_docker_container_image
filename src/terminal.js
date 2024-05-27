const WebSocket = require('ws');
const os = require('os');
const pty = require('node-pty');

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
        // process.stdout.write(data);
        ws.send(data);
    });
    
    // Handle WebSocket messages
    ws.on('message', function incoming(message) {
        // Send data from pty to WebSocket clients
        // if(check){
        //     check = false;            
        // }
        ptyProcess.write(message);
    });

    // Handle WebSocket client disconnect
    ws.on('close', function close() {
        console.log('Client disconnected');
    });
});