import fs from 'fs';
import path from 'path';
import WebSocket from 'ws';

const wss = new WebSocket.Server({ port: 1001 });

wss.on('connection', (ws: WebSocket) => {
    const folderPath = '/root';
    console.log('Client connected - FS');

    // Send initial file structure
    sendFileStructure(ws, folderPath);

    // Periodically send updated file structure
    setInterval(() => {
        sendFileStructure(ws, folderPath);
    }, 1400); // Repeat every 5 seconds

    ws.on('close', () => {
        console.log('Client disconnected');
    });
});

function sendFileStructure(ws: WebSocket, folderPath: string) {
    const folderStructure = getAllFilesAndFolders(folderPath);
    ws.send(JSON.stringify(folderStructure));
}

function getAllFilesAndFolders(folderPath: string): Record<string, any> {
    const result: Record<string, any> = {};

    // Read the contents of the folder
    try {
        const items = fs.readdirSync(folderPath);

        // Iterate through the items in the folder
        items.forEach(item => {
            // Skip hidden files and folders
            if (item.startsWith('.')) {
                return;
            }

            // Get the full path of the item
            const itemPath = path.resolve('/', folderPath, item);

            // Check if the item is a file or a folder
            const stats = fs.statSync(itemPath);
            if (stats.isFile()) {
                // If it's a file, add it to the result object directly
                result[itemPath] = null;
            } else if (stats.isDirectory()) {
                // If it's a directory, recursively call the function to get its contents
                result[itemPath] = getAllFilesAndFolders(itemPath);
            }
        });
    } catch (error) {
        console.error('Error reading folder:', error);
    }
    
    return result;
}
