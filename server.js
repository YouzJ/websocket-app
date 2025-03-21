// Import libraries
const WebSocket = require('ws');
const mongoose = require('mongoose');
const Message = require('./messageModel'); // Import the message model

// Connect to MongoDB (replace with your MongoDB URI)
mongoose.connect('mongodb+srv://yousnysj:cDw9TQ3VrbxcuxiF@cluster0.ee9cr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
useNewUrlParser: true,
useUnifiedTopology: true
})
.then(() => {
console.log('Connected to MongoDB');
})
.catch((err) => {
console.error('MongoDB connection error:', err);
});

// Create a WebSocket server
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
ws.on('message', async (message) => {
console.log(`Received message: ${message}`);

// Save the message to the database
try {
const username = 'Anonymous'; // You can extract this from the client if needed
const newMessage = new Message({ username, message });
await newMessage.save(); // Save the message to MongoDB
console.log('Message saved to database');

// Broadcast the message to all connected clients
clients.forEach(client => {
if (client !== ws && client.readyState === WebSocket.OPEN) {
client.send(message);
}
});
} catch (error) {
console.error('Error saving message:', error);
}
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