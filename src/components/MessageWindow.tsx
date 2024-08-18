import React, { useEffect, useState, useRef } from 'react';

const MessageWindow = ({ conversation, messages, user }) => {
  const [messageList, setMessageList] = useState(conversation?.messages || []);
  const messageEndRef = useRef(null);

  const safeDate = (timestamp) => {
    const date = new Date(parseInt(timestamp, 10));
    return isNaN(date.getTime()) ? 'Invalid Date' : date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  useEffect(() => {
    setMessageList(messages || []);
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    if (messageEndRef.current) {
      messageEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="flex-1 flex flex-col overflow-y-auto space-y-4 p-4 bg-white">
      {messageList.length > 0 ? (
        messageList.map((msg, index) => (
          <div
            key={index}
            className={`flex ${msg?.sender?._id === user?._id ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`p-3 rounded-lg max-w-xs ${
                msg?.sender?._id === user?._id ? 'bg-purple-800 text-white' : 'bg-purple-400 text-black'
              }`}
              style={{ padding: '10px', margin: '5px', wordBreak: 'break-word' }}
            >
              <div className="text-sm">{msg?.content}</div>
              <div className="text-xs text-gray-300 mt-1">
                {safeDate(msg?.timestamp)}
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="text-center text-gray-500">No messages to display</div>
      )}
      <div ref={messageEndRef} />
    </div>
  );
};

export default MessageWindow;
