const fs = require('fs');
const path = require('path');
const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 1002 });

wss.on('connection', (ws, req) => {
    const params = new URLSearchParams(req.url.split('?')[1]);

    console.log(params)
    const filePath = params.get('filePath');
    console.log('Client connected');
    
    if(filePath === '')  ws.close();

    // Send file content when client connects
    sendFileContent(ws, filePath);


    // Handle WebSocket messages
    ws.on('message', function incoming(message) {
        // Write the received message to the file
        console.log(message);
        writeFileContent(filePath, message);
    });

    ws.on('close', () => {
        console.log('Client disconnected');
    });
});

function sendFileContent(ws, filePath) {
    // Read the content of the file
    try {
        const content = fs.readFileSync(filePath, 'utf-8');
        ws.send(content);
    } catch (error) {
        console.error('Error reading file:', error);
    }
}

function writeFileContent(filePath, content) {
    // Write content to the file
    try {
        fs.writeFileSync(filePath, content);
        console.log('Content written to file:', content);
    } catch (error) {
        console.error('Error writing to file:', error);
    }
}