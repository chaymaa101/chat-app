import { useEffect } from "react"; // Importing useEffect hook from React.
import useConversation from "../../zustand/useConversation"; // Custom hook for managing conversation state.
import MessageInput from "./MessageInput"; // Component for message input.
import Messages from "./Messages"; // Component for displaying messages.
import { TiMessages } from "react-icons/ti"; // Icon component for message icon.
import { useAuthContext } from "../../context/AuthContext"; // Custom hook for accessing authentication context.

// MessageContainer component responsible for displaying messages and message input.
const MessageContainer = () => {
    // Accessing selected conversation state and setter function from custom hook.
    const { selectedConversation, setSelectedConversation } = useConversation();

    // useEffect hook to clear selected conversation when component unmounts.
    useEffect(() => {
        // Cleanup function to clear selected conversation when component unmounts.
        return () => setSelectedConversation(null);
    }, [setSelectedConversation]);

    // Rendering message container based on whether a conversation is selected.
    return (
        <div className='md:min-w-[450px] flex flex-col'>
            {!selectedConversation ? (
                // Rendered when no conversation is selected.
                <NoChatSelected />
            ) : (
                // Rendered when a conversation is selected.
                <>
                    {/* Header displaying conversation recipient's name */}
                    <div className='bg-slate-500 px-4 py-2 mb-2'>
                        <span className='label-text'>To:</span>{" "}
                        <span className='text-gray-900 font-bold'>{selectedConversation.fullName}</span>
                    </div>
                    {/* Component for displaying messages */}
                    <Messages />
                    {/* Component for message input */}
                    <MessageInput />
                </>
            )}
        </div>
    );
};

export default MessageContainer; // Exporting the MessageContainer component.

// Component rendered when no chat is selected.
const NoChatSelected = () => {
    // Accessing authentication user data from context.
    const { authUser } = useAuthContext();

    // Rendering welcome message and message icon.
    return (
        <div className='flex items-center justify-center w-full h-full'>
            <div className='px-4 text-center sm:text-lg md:text-xl text-gray-200 font-semibold flex flex-col items-center gap-2'>
                <p>Welcome 👋 {authUser.fullName} ❄</p>
                <p>Select a chat to start messaging</p>
                <TiMessages className='text-3xl md:text-6xl text-center' />
            </div>
        </div>
    );
};
