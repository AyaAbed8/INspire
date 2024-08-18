import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Inbox from '@/src/components/inbox';

const ConversationPage = () => {
  const [conversations, setConversations] = useState([]);
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState('');
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [recipient, setRecipient] = useState('');  // Define setRecipient
  const router = useRouter();
  const { id: conversationId } = router.query;

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      setUser(storedUser);
      fetchConversations(storedUser._id);
    } else {
      console.error('No user found in localStorage');
    }
  }, []);

  const fetchConversations = async (userId) => {
    try {
      const res = await fetch('/api/graphql', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: `
            query ($userId: ID!) {
              listConversations(userId: $userId) {
                _id
                participants {
                  _id
                  name
                }
                messages {
                  sender {
                    _id
                    name
                  }
                  content
                  timestamp
                }
              }
            }
          `,
          variables: { userId },
        }),
      });

      const { data, errors } = await res.json();

      if (errors) {
        console.error('GraphQL errors:', errors);
        return;
      }

      const filteredConversations = data.listConversations.map(conversation => ({
        ...conversation,
        messages: conversation.messages.filter(msg => msg.sender),
      }));

      setConversations(filteredConversations);

      if (conversationId) {
        const selected = filteredConversations.find(conversation => conversation._id === conversationId);
        setSelectedConversation(selected);
      }
    } catch (error) {
      console.error('Failed to fetch conversations:', error);
    }
  };

  const handleSendMessage = async () => {
    if (!message.trim()) {
      console.error('Cannot send an empty message.');
      return;
    }

    try {
      const res = await fetch('/api/graphql', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: `
            mutation($conversationId: ID!, $sender: ID!, $content: String!) {
              addMessage(conversationId: $conversationId, sender: $sender, content: $content) {
                sender {
                  _id
                  name
                }
                content
                timestamp
              }
            }
          `,
          variables: {
            conversationId: selectedConversation._id,
            sender: user._id,
            content: message,
          },
        }),
      });

      const { data, errors } = await res.json();

      if (errors) {
        console.error('Failed to send message:', errors);
        return;
      }

      // Add the new message to the list of messages
      setSelectedConversation(prev => ({
        ...prev,
        messages: [...prev.messages, data.addMessage],
      }));
      
      // Clear the input field
      setMessage('');

      // Refetch the conversation to ensure it's saved in the backend
      fetchConversations(user._id);
      
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  if (!user) {
    return <div>Loading user information...</div>;
  }

  return (
    <div className="h-screen flex flex-col">
      <Inbox
        user={user}
        conversations={conversations}
        recipient={recipient}
        setRecipient={setRecipient}  // Pass setRecipient to Inbox
        selectedConversation={selectedConversation}
        setSelectedConversation={setSelectedConversation}
        handleConversationClick={(id) => {
          const selected = conversations.find(conversation => conversation._id === id);
          if (selected) {
            setSelectedConversation(selected);
          }
        }}
        message={message}  
        setMessage={setMessage}  
        handleSendMessage={handleSendMessage}  
      />
    </div>
  );
};

export default ConversationPage;
