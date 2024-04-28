import { useEffect, useRef } from "react"; // Importing useEffect and useRef hooks from React.
import useGetMessages from "../../hooks/useGetMessages"; // Custom hook for getting messages.
import MessageSkeleton from "../skeletons/MessageSkeleton"; // Skeleton component for loading messages.
import Message from "./Message"; // Component for displaying individual message.
import useListenMessages from "../../hooks/useListenMessages"; // Custom hook for listening to new messages.

// Messages component responsible for displaying a list of messages.
const Messages = () => {
    // Fetching messages and loading state using custom hook.
    const { messages, loading } = useGetMessages();

    // Custom hook to listen for new messages.
    useListenMessages();

    // Ref for the last message element to scroll into view.
    const lastMessageRef = useRef();

    // Effect to scroll to the last message when new messages are received.
    useEffect(() => {
        // Using setTimeout to ensure scrolling happens after rendering.
        setTimeout(() => {
            lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
        }, 100);
    }, [messages]); // Trigger effect when messages change.

    // Rendering the list of messages.
    return (
        <div className='px-4 flex-1 overflow-auto'>
            {/* Rendering messages if not loading and messages exist */}
            {!loading && messages.length > 0 && messages.map((message) => (
                <div key={message._id} ref={lastMessageRef}>
                    {/* Individual message component */}
                    <Message message={message} />
                </div>
            ))}

            {/* Skeleton loaders for loading messages */}
            {loading && [...Array(3)].map((_, idx) => <MessageSkeleton key={idx} />)}

            {/* Message indicating no messages if not loading and no messages exist */}
            {!loading && messages.length === 0 && (
                <p className='text-center'>Send a message to start the conversation</p>
            )}
        </div>
    );
};

export default Messages; // Exporting the Messages component.
