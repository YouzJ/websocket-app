const mongoose = require('mongoose');

// Define the message schema
const messageSchema = new mongoose.Schema({
username: { type: String, required: true },
message: { type: String, required: true },
timestamp: { type: Date, default: Date.now }
});

// Create the message model
const Message = mongoose.model('Message', messageSchema);

module.exports = Message;