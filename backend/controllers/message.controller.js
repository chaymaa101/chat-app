import Conversation from "../models/conversation.model.js"; // Importing Conversation model
import Message from "../models/message.model.js"; // Importing Message model
import { getReceiverSocketId, io } from "../socket/socket.js"; // Importing socket functionality

// Controller to send a message
export const sendMessage = async (req, res) => {
	try {
		const { message } = req.body; // Extracting message from request body
		const { id: receiverId } = req.params; // Extracting receiverId from request parameters
		const senderId = req.user._id; // Extracting senderId from authenticated user

		// Finding or creating conversation between sender and receiver
		let conversation = await Conversation.findOne({
			participants: { $all: [senderId, receiverId] },
		});

		if (!conversation) {
			conversation = await Conversation.create({
				participants: [senderId, receiverId],
			});
		}

		// Creating a new message
		const newMessage = new Message({
			senderId,
			receiverId,
			message,
		});

		if (newMessage) {
			conversation.messages.push(newMessage._id);
		}

		// Saving conversation and message (in parallel)
		await Promise.all([conversation.save(), newMessage.save()]);

		// Sending the new message event to the receiver's socket
		const receiverSocketId = getReceiverSocketId(receiverId);
		if (receiverSocketId) {
			io.to(receiverSocketId).emit("newMessage", newMessage);
		}

		// Responding with the created message
		res.status(201).json(newMessage);
	} catch (error) {
		console.log("Error in sendMessage controller: ", error.message);
		res.status(500).json({ error: "Internal server error" });
	}
};

// Controller to get messages in a conversation
export const getMessages = async (req, res) => {
	try {
		const { id: userToChatId } = req.params; // Extracting userToChatId from request parameters
		const senderId = req.user._id; // Extracting senderId from authenticated user

		// Finding conversation between sender and user to chat with
		const conversation = await Conversation.findOne({
			participants: { $all: [senderId, userToChatId] },
		}).populate("messages"); // Populating actual messages (not just references)

		// If no conversation found, respond with an empty array
		if (!conversation) return res.status(200).json([]);

		// Extracting messages from the conversation
		const messages = conversation.messages;

		// Responding with the messages
		res.status(200).json(messages);
	} catch (error) {
		console.log("Error in getMessages controller: ", error.message);
		res.status(500).json({ error: "Internal server error" });
	}
};
