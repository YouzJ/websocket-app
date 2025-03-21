// Import the WebSocket library
const WebSocket = require('ws');
// Create a WebSocket server that listens on port 8080
const wss = new WebSocket.Server({ port: 8080 });
// Store all connected clients
const clients = [];
// When a client connects
wss.on('connection', (ws) => {
console.log('A client connected!');
// Add the new client to the clients array
clients.push(ws);
// Send a welcome message to the new client
ws.send('Hello, client! Welcome to the WebSocket server.');
// When the server receives a message from the client
ws.on('message', (message) => {
console.log(`Received message: ${message}`);
// Broadcast the message to all connected clients
clients.forEach(client => {
if (client !== ws && client.readyState === WebSocket.OPEN) {
client.send(message);
}
});
});
// When the connection is closed, remove the client from the clients array
ws.on('close', () => {
console.log('A client disconnected');
const index = clients.indexOf(ws);
if (index !== -1) {
clients.splice(index, 1); // Remove the client from the list
}
});
// Handle any WebSocket errors
ws.on('error', (error) => {
console.error(`WebSocket error: ${error}`);
});
});
console.log('WebSocket server is running on ws://localhost:8080');