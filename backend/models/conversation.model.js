import mongoose from "mongoose"; // Import the mongoose library.

// Define the schema for a conversation and create a corresponding model.

// Define the schema for a conversation.
const conversationSchema = new mongoose.Schema(
	{
		// Define properties of the conversation schema, including data type and validation rules.

		// Participants of the conversation. It references the User model.
		participants: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "User", // Reference to the User model.
			},
		],

		// Messages exchanged in the conversation. It references the Message model.
		messages: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "Message", // Reference to the Message model.
				default: [], // Default value is an empty array.
			},
		],
	},
	{ timestamps: true } // Enable automatic creation of createdAt and updatedAt fields.
);

// Create a model based on the conversation schema.
const Conversation = mongoose.model("Conversation", conversationSchema);

// Export the Conversation model for use in other parts of the application.
export default Conversation;
