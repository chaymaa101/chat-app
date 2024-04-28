// Import React and useEffect hook from React library
import { React, useEffect } from "react";
import io from "socket.io-client"; 
// Import custom hooks and context
import { useSocketContext } from "../context/SocketContext";
import useConversation from "../zustand/useConversation";

// Import notification sound
import notificationSound from "../assets/sounds/notification.mp3";

// Custom hook for listening to new messages
const useListenMessages = () => {
	// Get socket and messages state from context and custom hook
	const { socket } = useSocketContext();
	const { messages, setMessages } = useConversation();

	// Effect hook to listen for new messages
	useEffect(() => {
		// Add event listener for "newMessage" event emitted by the socket
		socket?.on("newMessage", (newMessage) => {
			// Add a flag to indicate that the message should shake (for UI effect)
			newMessage.shouldShake = true;

			// Play notification sound
			const sound = new Audio(notificationSound);
			sound.play();

			// Update messages state with the new message
			setMessages([...messages, newMessage]);
		});

		// Cleanup function to remove event listener when component unmounts
		return () => socket?.off("newMessage");
	}, [socket, setMessages, messages]); // Dependency array to ensure the effect runs only when dependencies change
};

// Export the custom hook for use in other components
export default useListenMessages;
