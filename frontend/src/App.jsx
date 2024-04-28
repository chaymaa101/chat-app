import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import SignUp from "./pages/signup/SignUp";
import { Toaster } from "react-hot-toast";
import { useAuthContext } from "./context/AuthContext";

function App() {
    // Access authUser from the authentication context
    const { authUser } = useAuthContext();
    return (
        <div className='p-4 h-screen flex items-center justify-center'>
            {/* Define routes for different pages */}
            <Routes>
                {/* If user is authenticated, render Home page, else navigate to Login page */}
                <Route path='/' element={authUser ? <Home /> : <Navigate to={"/login"} />} />
                {/* If user is authenticated, redirect to Home page, else render Login page */}
                <Route path='/login' element={authUser ? <Navigate to='/' /> : <Login />} />
                {/* If user is authenticated, redirect to Home page, else render SignUp page */}
                <Route path='/signup' element={authUser ? <Navigate to='/' /> : <SignUp />} />
            </Routes>
            {/* Display toast notifications */}
            <Toaster />
        </div>
    );
}

export default App;
