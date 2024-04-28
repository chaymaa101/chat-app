import React from 'react'; // Importing React library.
import { BiLogOut } from "react-icons/bi"; // Importing logout icon from react-icons.
import useLogout from "../../hooks/useLogout"; // Importing custom hook to handle logout functionality.

// LogoutButton component responsible for rendering the logout button.
const LogoutButton = () => {
  
  // Using custom hook to handle logout functionality and loading state.
	const { loading, logout } = useLogout();

	// Rendering the component.
	return (
		<div className='mt-auto'>
      {/* Conditional rendering of logout button or loading spinner */}
			{!loading ? (
				<BiLogOut className='w-6 h-6 text-white cursor-pointer' onClick={logout} />
			) : (
				<span className='loading loading-spinner'></span>
			)}
		</div>
	);
};

export default LogoutButton; // Exporting the LogoutButton component.
