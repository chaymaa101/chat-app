import React from "react";
import ReactDOM from "react-dom";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from 'react-router-dom';

import { AuthContextProvider } from "./context/AuthContext.jsx";
import { SocketContextProvider } from "./context/SocketContext.jsx";

// Use ReactDOM.render instead of ReactDOM.createRoot.render for compatibility
ReactDOM.render(
    <React.StrictMode>
        {/* Wrap the entire application with BrowserRouter for routing */}
        <BrowserRouter>
            {/* Provide authentication context to the entire application */}
            <AuthContextProvider>
                {/* Provide socket context to the entire application */}
                <SocketContextProvider>
                    {/* Render the main App component */}
                    <App />
                </SocketContextProvider>
            </AuthContextProvider>
        </BrowserRouter>
    </React.StrictMode>,
    document.getElementById("root")
);
