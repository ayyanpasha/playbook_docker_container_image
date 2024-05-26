import fs from 'fs';
import path from 'path';
import WebSocket from 'ws';
import { IncomingMessage } from 'http';

const wss = new WebSocket.Server({ port: 1002 });

wss.on('connection', (ws: WebSocket, req: IncomingMessage) => {
    const params = new URLSearchParams(req.url!.split('?')[1]);

    const filePath = params.get('filePath');
    console.log('Client connected');
    
    if (!filePath) {
        ws.close();
        return;
    }

    // Send file content when client connects
    sendFileContent(ws, filePath);

    // Handle WebSocket messages
    ws.on('message', (message: WebSocket.Data) => {
        // Write the received message to the file
        writeFileContent(filePath!, message.toString());
    });

    ws.on('close', () => {
        console.log('Client disconnected');
    });
});

function sendFileContent(ws: WebSocket, filePath: string | null) {
    // Read the content of the file
    try {
        if (!filePath) throw new Error('File path is not provided');
        const content = fs.readFileSync(filePath, 'utf-8');
        ws.send(content);
    } catch (error) {
        console.error('Error reading file:', error);
    }
}

function writeFileContent(filePath: string, content: string) {
    // Write content to the file
    try {
        fs.writeFileSync(filePath, content);
    } catch (error) {
        console.error('Error writing to file:', error);
    }
}
