import React from 'react';

const Message = () => {
  return (
    <div className='chat chat-end'>
      <div className="chat-image avatar">
        <div className="w-10 h-10 rounded-full">
          <img alt="Avatar" src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
        </div>
      </div>
      <div className="chat-bubble text-white bg-blue-500">Hi, how are you doing?!</div>
      <div className="chat-footer opacity-50 text-white text-xs flex gap-1 items-center">
        Seen at 12:46
      </div>
    </div>
  );
};

export default Message;
