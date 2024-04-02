import mongoose from "mongoose"; // Import the mongoose library.

// Define the schema for a message and create a corresponding model.

// Define the schema for a message.
const messageSchema = new mongoose.Schema(
	{
		// Define properties of the message schema, including data type and validation rules.

		// Sender's ID. It references the User model.
		senderId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User", // Reference to the User model.
			required: true, // SenderId is required.
		},

		// Receiver's ID. It references the User model.
		receiverId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User", // Reference to the User model.
			required: true, // ReceiverId is required.
		},

		// Content of the message.
		message: {
			type: String,
			required: true, // Message content is required.
		},

		// createdAt and updatedAt fields will be automatically created.
	},
	{ timestamps: true } // Enable automatic creation of createdAt and updatedAt fields.
);

// Create a model based on the message schema.
const Message = mongoose.model("Message", messageSchema);

// Export the Message model for use in other parts of the application.
export default Message;
