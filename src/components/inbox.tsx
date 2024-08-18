import React, { useState } from "react";
import { useRouter } from 'next/router';
import SearchBar from "./SearchBar";
import RecentChats from "./RecentChats";
import MessageWindow from "./MessageWindow";
import MessageInput from "./MessageInput";
import NewConversationModal from "./NewConversationModal";
import Header from '@/src/components/Header';
import Image from 'next/image'; 
import sleepingBird from '/public/assets/sleeping-bird.png';

const Inbox = ({
  user,
  conversations,
  recipient,
  setRecipient,
  handleCreateConversation,
  message,
  setMessage,
  selectedConversation,
  setSelectedConversation,
  handleSendMessage 
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const router = useRouter();
  const handleBackClick = () => {
    setSelectedConversation(null);
    router.push('/inbox');
  };

  const handleConversationClick = (conversationId) => {
    const selected = conversations.find(conversation => conversation._id === conversationId);
    if (selected) {
      console.log('Selected Conversation:', selected);  // Debugging
      setSelectedConversation(selected);
    } else {
      console.error('No conversation found for ID:', conversationId);
    }
  };

  return (
    <div className="h-screen flex flex-col">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <div className="w-1/4 bg-white text-white border-r-4 border-purple-500 relative overflow-y-auto">
          <SearchBar 
            setRecipient={setRecipient} 
            recipient={recipient} 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <RecentChats
            conversations={conversations}
            user={user}
            searchQuery={searchQuery}
            handleConversationClick={handleConversationClick}  // Pass the updated function
          />
          <button
            className="bg-purple-600 text-white rounded-full w-12 h-12 flex items-center justify-center absolute bottom-4 left-4 shadow-lg hover:bg-purple-700"
            onClick={toggleModal}
          >
            +
          </button>
        </div>
        <div className="flex-1 flex flex-col bg-white">
          {selectedConversation ? (
            <>
              <div className="flex items-center justify-between p-4 border-b">
                <button
                  onClick={handleBackClick}
                  className="text-purple-500 hover:text-purple-700"
                >
                  ← Back
                </button>
                <h2 className="text-xl font-bold text-center flex-1">
                  {selectedConversation.participants?.find(p => p._id !== user._id)?.name || "No Participant"}
                </h2>
                <div className="w-8"></div> {/* Placeholder for spacing */}
              </div>
              <div className="flex-1 flex flex-col overflow-hidden">
                <MessageWindow 
                  conversation={selectedConversation} 
                  messages={selectedConversation.messages} 
                  user={user}
                />
                <div className="border-t p-2 bg-white">
                  <MessageInput
                    message={message}
                    setMessage={setMessage}
                    handleSendMessage={handleSendMessage} 
                  />
                </div>
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center flex-1">
              <Image src={sleepingBird} alt="Sleeping Bird" width={175} height={175} />
              <p className="text-gray-500 mt-4">Select or start a conversation to chat</p>
            </div>
          )}
        </div>
      </div>
      {isModalOpen && (
        <NewConversationModal
          toggleModal={toggleModal}
          setRecipient={setRecipient}
          handleCreateConversation={handleCreateConversation}
        />
      )}
    </div>
  );
};

export default Inbox;
