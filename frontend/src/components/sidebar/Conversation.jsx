import { useSocketContext } from "../../context/SocketContext"; // Importing custom hook for socket context.
import useConversation from "../../zustand/useConversation"; // Importing custom hook for conversation state management.

// Conversation component responsible for displaying individual conversation item.
const Conversation = ({ conversation, lastIdx, emoji }) => {
    // Accessing selected conversation state and setter from custom hook.
    const { selectedConversation, setSelectedConversation } = useConversation();

    // Checking if the conversation is selected.
    const isSelected = selectedConversation?._id === conversation._id;

    // Accessing online users from socket context.
    const { onlineUsers } = useSocketContext();

    // Checking if the conversation user is online.
    const isOnline = onlineUsers.includes(conversation._id);

    // Rendering individual conversation item.
    return (
        <>
            {/* Conversation item container */}
            <div
                className={`flex gap-2 items-center hover:bg-sky-500 rounded p-2 py-1 cursor-pointer
				${isSelected ? "bg-sky-500" : ""}
			`}
                onClick={() => setSelectedConversation(conversation)} // Set selected conversation on click.
            >
                {/* Avatar */}
                <div className={`avatar ${isOnline ? "online" : ""}`}>
                    <div className='w-12 rounded-full'>
                        <img src={conversation.profilePic} alt='user avatar' />
                    </div>
                </div>

                {/* Conversation details */}
                <div className='flex flex-col flex-1'>
                    <div className='flex gap-3 justify-between'>
                        {/* User name */}
                        <p className='font-bold text-gray-200'>{conversation.fullName}</p>
                        {/* Emoji */}
                        <span className='text-xl'>{emoji}</span>
                    </div>
                </div>
            </div>

            {/* Divider if not last conversation item */}
            {!lastIdx && <div className='divider my-0 py-0 h-1' />}
        </>
    );
};

export default Conversation; // Exporting the Conversation component.
