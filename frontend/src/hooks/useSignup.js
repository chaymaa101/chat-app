import { useState } from "react"; // Importing useState hook from React.
import toast from "react-hot-toast"; // Importing toast for displaying error messages.
import { useAuthContext } from "../context/AuthContext"; // Importing the authentication context hook.

// Custom hook for handling user signup.
const useSignup = () => {
    const [loading, setLoading] = useState(false); // State variable for loading state during signup.
    const { setAuthUser } = useAuthContext(); // Accessing the authentication context.

    // Function to handle user signup.
    const signup = async ({ fullName, username, password, confirmPassword, gender }) => {
        // Checking for input errors before proceeding with signup.
        const success = handleInputErrors({ fullName, username, password, confirmPassword, gender });
        if (!success) return; // If there are errors, exit the function.

        setLoading(true); // Set loading state to true during signup.
        try {
            // Sending a POST request to the backend to signup the user.
            const res = await fetch("/api/auth/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ fullName, username, password, confirmPassword, gender }),
            });

            const data = await res.json(); // Parsing the response data.
            if (data.error) {
                throw new Error(data.error); // Throwing an error if signup was unsuccessful.
            }
            localStorage.setItem("chat-user", JSON.stringify(data)); // Storing user data in local storage.
            setAuthUser(data); // Setting the authenticated user.
        } catch (error) {
            toast.error(error.message); // Displaying an error message if signup fails.
        } finally {
            setLoading(false); // Resetting loading state after signup attempt.
        }
    };

    return { loading, signup }; // Returning loading state and signup function.
};

export default useSignup; // Exporting the custom hook for signup.

// Function to handle input errors during signup.
function handleInputErrors({ fullName, username, password, confirmPassword, gender }) {
    // Checking if any required field is empty.
    if (!fullName || !username || !password || !confirmPassword || !gender) {
        toast.error("Please fill in all fields");
        return false;
    }

    // Checking if password and confirm password match.
    if (password !== confirmPassword) {
        toast.error("Passwords do not match");
        return false;
    }

    // Checking if password length is at least 6 characters.
    if (password.length < 6) {
        toast.error("Password must be at least 6 characters");
        return false;
    }

    return true; // Returning true if no errors are found.
}
