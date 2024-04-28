import MessageContainer from "../../components/messages/MessageContainer"; // Importing the MessageContainer component.
import Sidebar from "../../components/sidebar/Sidebar"; // Importing the Sidebar component.

// Functional component for the Home page.
const Home = () => {
    return (
        <div className='flex sm:h-[450px] md:h-[550px] rounded-lg overflow-hidden bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
            <Sidebar /> {/* Rendering the Sidebar component. */}
            <MessageContainer /> {/* Rendering the MessageContainer component. */}
        </div>
    );
};

export default Home; // Exporting the Home component.
