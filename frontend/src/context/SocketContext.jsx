import { createContext, useState, useEffect, useContext } from "react";
import io from 'socket.io-client'; // Importing the socket.io client library.

import { useAuthContext } from "./AuthContext";

// Creating a context for socket-related data.
const SocketContext = createContext();

// Custom hook to use the socket context.
export const useSocketContext = () => {
	return useContext(SocketContext);
};

// SocketContextProvider component to provide socket-related data to its children.
export const SocketContextProvider = ({ children }) => {
	// State to store the socket instance.
	const [socket, setSocket] = useState(null);
	// State to store online users.
	const [onlineUsers, setOnlineUsers] = useState([]);
	// Accessing authentication data from the AuthContext.
	const { authUser } = useAuthContext();

	// Establishing socket connection when the authUser changes.
	useEffect(() => {
		if (authUser) {
			// Creating a new socket instance with the user's ID as a query parameter.
			const newSocket = io("http://localhost:3000", {
				query: {
					userId: authUser._id,
				},
			});

			// Setting the socket state with the new socket instance.
			setSocket(newSocket);

			// Listening to the 'getOnlineUsers' event to update the list of online users.
			newSocket.on("getOnlineUsers", (users) => {
				setOnlineUsers(users);
			});

			// Cleaning up socket connection when the component unmounts.
			return () => newSocket.close();
		} else {
			// Closing socket connection if the user is not authenticated.
			if (socket) {
				socket.close();
				setSocket(null);
			}
		}
	}, [authUser]);

	// Providing socket instance and onlineUsers to the context.
	return <SocketContext.Provider value={{ socket, onlineUsers }}>{children}</SocketContext.Provider>;
};
