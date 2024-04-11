import React from 'react'
import Sidebar from '../../components/sidebar/Sidebar.jsx'
import MessageContainer from '../../components/messages/MessageContainer.jsx'

const Home = () => {
  return (
    <div className='flex sm:h-[450px] md:h-[550px] rounded-lg overflow-hidden bg-clip-padding bg-gray-500 backdrop-filter backdrop-blur-lg bg-opacity-10' >
      <Sidebar /> 
      <MessageContainer />
  
    </div>
  )
}

export default Home
