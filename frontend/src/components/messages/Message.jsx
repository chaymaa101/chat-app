// Importing necessary dependencies and hooks from React and custom modules.
import { useAuthContext } from "../../context/AuthContext"; // Custom hook for accessing authentication context.
import { extractTime } from "../../utils/extractTime"; // Utility function to extract time from message creation timestamp.
import useConversation from "../../zustand/useConversation"; // Custom hook for managing conversation state.

// Message component responsible for rendering individual chat messages.
const Message = ({ message }) => {
    // Accessing authentication user data from context.
    const { authUser } = useAuthContext();
    // Accessing selected conversation data from state.
    const { selectedConversation } = useConversation();

    // Determining if the message is sent by the authenticated user.
    const fromMe = message.senderId === authUser._id;

    // Formatting the timestamp of the message.
    const formattedTime = extractTime(message.createdAt);

    // Applying different CSS classes based on message sender (me or others).
    const chatClassName = fromMe ? "chat-end" : "chat-start";

    // Determining the profile picture to display in the chat bubble.
    const profilePic = fromMe ? authUser.profilePic : selectedConversation?.profilePic;

    // Applying different background color to the chat bubble based on message sender.
    const bubbleBgColor = fromMe ? "bg-blue-500" : "";

    // Applying shaking animation effect to the chat bubble if necessary.
    const shakeClass = message.shouldShake ? "shake" : "";

    // Rendering the message bubble with sender's image, message content, and timestamp.
    return (
        <div className={`chat ${chatClassName}`}>
            {/* Displaying sender's profile picture. */}
            <div className='chat-image avatar'>
                <div className='w-10 rounded-full'>
                    <img alt='Profile Picture' src={profilePic} />
                </div>
            </div>
            {/* Displaying message content within a styled chat bubble. */}
            <div className={`chat-bubble text-white ${bubbleBgColor} ${shakeClass} pb-2`}>
                {message.message}
            </div>
            {/* Displaying message timestamp in the chat footer. */}
            <div className='chat-footer opacity-50 text-xs flex gap-1 items-center'>{formattedTime}</div>
        </div>
    );
};

export default Message; // Exporting the Message component for use in other parts of the application.
