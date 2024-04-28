import React from 'react'; // Importing React library.
import Conversation from './Conversation.jsx'; // Importing Conversation component.
import useGetConversations from '../../hooks/useGetConversations.js'; // Importing custom hook to fetch conversations.
import { getRandomEmoji } from '../../utils/emojis.js'; // Importing utility function to get random emoji.

// Conversations component responsible for displaying list of conversations.
const Conversations = () => {
  
  // Using custom hook to fetch conversations and loading state.
  const { loading, conversations } = useGetConversations();
  
  // Rendering the component.
  return (
    <div className='py-2 flex flex-col overflow-auto'>
      {/* Mapping through conversations array and rendering each conversation */}
      {conversations.map((conversation, idx) => (
        <Conversation
          key={conversation._id} // Unique key for each conversation.
          conversation={conversation} // Passing conversation object as prop.
          emoji={getRandomEmoji()} // Generating random emoji for each conversation.
          lastIdx={idx === conversations.length - 1} // Boolean flag to indicate last conversation.
        />
      ))}

      {/* Loading spinner if conversations are still loading */}
      {loading ? <span className='loading loading-spinner mx-auto'></span> : null}
    </div>
  );
}

export default Conversations; // Exporting the Conversations component.
