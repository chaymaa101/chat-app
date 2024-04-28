import { useState } from "react"; // Importing useState hook from React.
import { BsSend } from "react-icons/bs"; // Icon component for send icon.
import useSendMessage from "../../hooks/useSendMessage"; // Custom hook for sending messages.

// MessageInput component responsible for inputting and sending messages.
const MessageInput = () => {
    // State for managing message input value.
    const [message, setMessage] = useState("");

    // Custom hook for sending messages and managing loading state.
    const { loading, sendMessage } = useSendMessage();

    // Handler function for submitting the message form.
    const handleSubmit = async (e) => {
        e.preventDefault();
        // If message is empty, do not send.
        if (!message) return;
        // Send message and reset input field.
        await sendMessage(message);
        setMessage("");
    };

    // Rendering the message input form.
    return (
        <form className='px-4 my-3' onSubmit={handleSubmit}>
            <div className='w-full relative'>
                {/* Input field for typing messages */}
                <input
                    type="text"
                    className="border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 text-white"
                    placeholder="Type a message..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)} // Update message state on input change
                />
                {/* Button to submit message */}
                <button type='submit' className='absolute inset-y-0 end-0 flex items-center pe-3'>
                    {/* Show loading spinner if loading, otherwise show send icon */}
                    {loading ? <div className='loading loading-spinner'></div> : <BsSend />}
                </button>
            </div>
        </form>
    );
};

export default MessageInput; // Exporting the MessageInput component.
