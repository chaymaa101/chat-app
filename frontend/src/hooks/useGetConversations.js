// Custom hook to fetch conversations from the server
import { useEffect, useState } from "react"; // Importing React hooks for side effects and state management
import toast from "react-hot-toast"; // Importing toast notifications library

const useGetConversations = () => {
	// State variables for loading state and conversations data
	const [loading, setLoading] = useState(false); // Indicates whether data is currently being loaded
	const [conversations, setConversations] = useState([]); // Holds the fetched conversation data

	useEffect(() => {
		// Function to fetch conversations
		const getConversations = async () => {
			setLoading(true); // Set loading state to true to indicate data fetching is in progress
			try {
				// Fetch conversations from the server
				const res = await fetch("/api/users");
				const data = await res.json(); // Parse response data as JSON
				if (data.error) {
					// If there's an error message in the response data, throw an error
					throw new Error(data.error);
				}
				// Update conversations state with the fetched data
				setConversations(data);
			} catch (error) {
				// If an error occurs during fetch, display an error toast notification
				toast.error(error.message);
			} finally {
				// Set loading state to false to indicate data fetching is complete
				setLoading(false);
			}
		};

		// Call the function to fetch conversations when the component mounts
		getConversations();
	}, []); // Empty dependency array ensures the effect runs only once when the component mounts

	// Return loading state and conversations data as an object
	return { loading, conversations };
};

// Export the custom hook for use in other components
export default useGetConversations;
