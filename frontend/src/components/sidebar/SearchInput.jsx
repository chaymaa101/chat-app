import React from 'react'; // Importing React library.
import { BiSearchAlt } from "react-icons/bi"; // Importing search icon from react-icons.
import { useState } from 'react'; // Importing useState hook from React.
import useConversation from '../../zustand/useConversation'; // Importing custom hook for conversation state management.
import useGetConversations from '../../hooks/useGetConversations'; // Importing custom hook to fetch conversations.
import toast from "react-hot-toast"; // Importing toast notifications.

// SearchInput component responsible for rendering the search input and handling search functionality.
const SearchInput = () => {
  
  // State to store the search input value.
  const [search, setSearch] = useState('');
  
  // Custom hook to access conversation state and methods.
  const { setSelectedConversation } = useConversation();
  
  // Custom hook to fetch conversations.
  const { conversations } = useGetConversations();
  
  // Function to handle form submission and search functionality.
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Check if search term is empty.
    if (!search) return;
    
    // Check if search term is less than 3 characters.
    if (search.length < 3) {
      return toast.error("Search term must be at least 3 characters long");
    }

    // Find conversation that matches the search term.
    const conversation = conversations.find((c) => c.fullName.toLowerCase().includes(search.toLowerCase()));

    // If conversation is found, set it as selected conversation and clear the search input.
    if (conversation) {
      setSelectedConversation(conversation);
      setSearch("");
    } else {
      // If no conversation is found, show error toast.
      toast.error("No such user found!");
    }
  };

  // Rendering the component.
  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-2">
      {/* Search input field */}
      <input 
        type="text" 
        placeholder="Search..." 
        className="input input-bordered rounded-full"
        value={search}
        onChange={(e)=>setSearch(e.target.value)} 
      />
      {/* Search button */}
      <button type='submit' className="btn btn-circle bg-sky-500 text-white">
        <BiSearchAlt className='w-6 h-6 outline-none'/>
      </button>
    </form>
  )
}

export default SearchInput; // Exporting the SearchInput component.
