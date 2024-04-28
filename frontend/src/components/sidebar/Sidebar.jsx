import React from 'react'; // Importing React library.
import SearchInput from './SearchInput.jsx'; // Importing SearchInput component.
import Conversations from './Conversations.jsx'; // Importing Conversations component.
import LogoutButton from './LogoutButton.jsx'; // Importing LogoutButton component.

// Sidebar component responsible for rendering the sidebar layout.
const Sidebar = () => {
  return (
    <div className='border-r border-slate-500 p-4 flex flex-col h-full '>
      {/* Search input component */}
      <SearchInput />
      {/* Divider */}
      <div className='divider px-3'> </div>
      {/* Conversations component */}
      <Conversations />
      {/* Logout button component */}
      <LogoutButton /> 
    </div>
  )
}

export default Sidebar; // Exporting the Sidebar component.
