import React, { createContext, useContext, useState } from 'react';

// Creating a context for authentication data.
export const AuthContext = createContext();

// Custom hook to use the authentication context.
export const useAuthContext = () => {
    return useContext(AuthContext);
};

// AuthContextProvider component to provide authentication data to its children.
export const AuthContextProvider = ({ children }) => {
    // State to store the authenticated user data.
    const [authUser, setAuthUser] = useState(JSON.parse(localStorage.getItem("chat-user")) || null);

    // Providing the authUser state and setAuthUser function to the context.
    return (
        <AuthContext.Provider value={{ authUser, setAuthUser }}>
            {children}
        </AuthContext.Provider>
    );
};
