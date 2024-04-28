// Custom hook for fetching messages
import { useEffect, useState } from "react"; // Importing React hook for managing state
import useConversation from "../zustand/useConversation"; // Importing custom hook for managing conversation state
import toast from "react-hot-toast"; // Importing toast notifications library

const useGetMessages = () => {
	const [loading, setLoading] = useState(false); // State variable to indicate loading state
	const { messages, setMessages, selectedConversation } = useConversation(); // Accessing conversation state using custom hook

	useEffect(() => {
		// Function to fetch messages for the selected conversation
		const getMessages = async () => {
			setLoading(true); // Set loading state to true to indicate message fetching is in progress
			try {
				// Send a GET request to the server to fetch messages for the selected conversation
				const res = await fetch(`/api/messages/${selectedConversation._id}`);
				const data = await res.json(); // Parse response data as JSON
				if (data.error) throw new Error(data.error); // If there's an error message in the response data, throw an error
				setMessages(data); // Update messages state with the fetched messages
			} catch (error) {
				// If an error occurs during message fetching, display an error toast notification
				toast.error(error.message);
			} finally {
				setLoading(false); // Set loading state to false to indicate message fetching is complete
			}
		};

		// Fetch messages only if a conversation is selected
		if (selectedConversation?._id) getMessages();
	}, [selectedConversation?._id, setMessages]);

	// Return messages and loading state as an object
	return { messages, loading };
};

// Export the custom hook for use in other components
export default useGetMessages;
