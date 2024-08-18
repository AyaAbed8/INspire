import React from 'react';

const RecentChats = ({ conversations, user, handleConversationClick, searchQuery }) => {
  const safeDate = (timestamp) => {
    const date = new Date(parseInt(timestamp,10));
    return isNaN(date.getTime()) ? 'Invalid Date' : date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const filteredConversations = conversations.filter(conversation => {
    const talkingTo = conversation.participants.find(p => p._id !== user._id)?.name?.toLowerCase() || '';
    const lastMessageContent = conversation.messages?.filter(msg => msg.sender).slice(-1)[0]?.content?.toLowerCase() || '';

    return talkingTo.includes(searchQuery.toLowerCase()) || lastMessageContent.includes(searchQuery.toLowerCase());
  });

  return (
    <div className="p-4">
      {filteredConversations.map((conversation) => {
        const talkingTo = conversation.participants.find(p => p._id !== user._id);
        const lastMessage = conversation.messages?.filter(msg => msg.sender).slice(-1)[0];

        return (
          <div
            key={conversation._id}
            className="flex items-center p-2 bg-purple-500 mb-2 rounded-md cursor-pointer"
            onClick={() => handleConversationClick(conversation._id)}
          >
            <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center mr-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-600"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <circle cx="12" cy="12" r="10" fill="#e5e7eb" />
                <path
                  d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"
                  fill="#374151"
                />
              </svg>
            </div>
            <div className="flex-1">
              <div className="text-white">{talkingTo?.name || 'Unknown'}</div>
              <div className="text-gray-200 truncate">{lastMessage?.content?.slice(0, 50) || 'No messages yet...'}...</div>
            </div>
            <div className="text-gray-200">
              {safeDate(lastMessage?.timestamp)}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default RecentChats;
