import React from 'react';
import { useState } from 'react';
import { useAuthContext } from '../context/AuthContext'; // Importing the authentication context hook.
import toast from 'react-hot-toast'; // Importing toast for displaying error messages.

// Custom hook for handling user logout.
const useLogout = () => {
    const [loading, setLoading] = useState(false); // State variable for loading state during logout.
    const { setAuthUser } = useAuthContext(); // Accessing the authentication context.

    // Function to logout the user.
    const logout = async () => {
        setLoading(true); // Set loading state to true during logout.
        try {
            // Sending a POST request to the backend to logout the user.
            const res = await fetch('/api/auth/logout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }
            }); 
            const data = await res.json(); // Parsing the response data.
            if (data.error) {
                throw new Error(data.error); // Throwing an error if logout was unsuccessful.
            }
            localStorage.removeItem('chat-user'); // Removing user data from local storage.
            setAuthUser(null); // Setting the authenticated user to null.
        } catch (error) {
            toast.error(error.message); // Displaying an error message if logout fails.
        } finally {
            setLoading(false); // Resetting loading state after logout attempt.
        }
    }

    return { loading, logout }; // Returning loading state and logout function.
}

export default useLogout; // Exporting the custom hook for logout.
