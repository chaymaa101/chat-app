import Conversation from '../models/conversation.model.js';
import Message from '../models/message.model.js'; // Ensure this import points to where your Message model is actually located

export const sendMessage = async (req, res) => {
    try {
        const { message: messageText } = req.body; // Renamed to avoid confusion with the message model
        const { id: receiverId } = req.params; // Assuming this ID is the receiver's ID
        const senderId = req.user._id; // Assuming req.user is populated from some authentication middleware

        // Check if a conversation exists between these two users
        let conversation = await Conversation.findOne({
            participants: { $all: [senderId, receiverId] },
        });

        // If not, create a new conversation
        if (!conversation) {
            conversation = await Conversation.create({
                participants: [senderId, receiverId],
            });
        }

        // Create a new message
        const newMessage = await new Message({
            senderId,
            receiverId, 
            message: messageText, 
        });
//.save()
        conversation.messages.push(newMessage._id);
        //SOCKET IO FUNCTIONNALITY



        // await conversation.save(); 
        await Promise.all([conversation.save(),newMessage.save()]);//to run them in paralelel

        res.status(201).json(newMessage); // Send back the new message as a response

    } catch (error) {
        console.log('Error in sendMessage controller', error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};


export const getMessages = async (req, res) => {
	try {
		const { id: userToChatId } = req.params;
		const senderId = req.user._id;

		const conversation = await Conversation.findOne({
			participants: { $all: [senderId, userToChatId] },
		}).populate("messages"); // NOT REFERENCE BUT ACTUAL MESSAGES

		if (!conversation) return res.status(200).json([]);

		const messages = conversation.messages;

		res.status(200).json(messages);
	} catch (error) {
		console.log("Error in getMessages controller: ", error.message);
		res.status(500).json({ error: "Internal server error" });
	}
}; 