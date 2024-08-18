import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Inbox from '@/src/components/inbox';

const InboxPage = () => {
  const [conversations, setConversations] = useState([]);
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState('');
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [recipient, setRecipient] = useState('');  // Define setRecipient
  const router = useRouter();

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

      // Filter out any messages where the sender is null
      const filteredConversations = data.listConversations.map(conversation => ({
        ...conversation,
        messages: conversation.messages.filter(msg => msg.sender),
      }));

      setConversations(filteredConversations);
    } catch (error) {
      console.error('Failed to fetch conversations:', error);
    }
  };


  const handleCreateConversation = async (recipientName) => {
    console.log('handleCreateConversation called with recipientName:', recipientName);  // Debugging

    try {
      // Fetch the recipient's user ID first
      const recipientRes = await fetch('/api/graphql', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: `
            query($name: String!) {
              searchUser(query: $name, fields: "name", limit: 1) {
                _id
                name
              }
            }
          `,
          variables: { name: recipientName },
        }),
      });

      const { data: recipientData, errors: recipientErrors } = await recipientRes.json();

      if (recipientErrors || !recipientData.searchUser.length || !recipientData.searchUser[0].name) {
        console.error('Failed to fetch recipient ID or recipient has no name:', recipientErrors);
        return;
      }

      const recipientId = recipientData.searchUser[0]._id;

      // Now create or fetch the conversation using the recipient ID
      const res = await fetch('/api/graphql', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: `
            query($userId: ID!, $recipientId: ID!) {
              getConversationBetweenUsers(userId: $userId, recipientId: $recipientId) {
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
          variables: { userId: user._id, recipientId },
        }),
      });

      const { data, errors } = await res.json();

      if (errors || !data.getConversationBetweenUsers) {
        console.error('Failed to create or fetch conversation:', errors);
        return;
      }

      const newConversation = data.getConversationBetweenUsers;

      setConversations((prev) => [...prev, newConversation]);

      // Directly set the new conversation as the selected conversation and navigate to it
      setSelectedConversation(newConversation);

      // Redirect to the conversation page
      router.push(`/inbox/${newConversation._id}`);
    } catch (error) {
      console.error('Failed to create conversation:', error);
    }
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  const handleSendMessage = async () => {
    if (!message.trim()) {
      console.error("Cannot send an empty message.");
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

      // Update the selected conversation with the new message
      setSelectedConversation(prev => ({
        ...prev,
        messages: [...prev.messages, data.addMessage],
      }));

      // Clear the input field after sending the message
      setMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };


  return (
    <Inbox
      user={user}
      conversations={conversations}
      recipient={recipient}
      setRecipient={setRecipient}
      handleCreateConversation={handleCreateConversation}
      handleSendMessage={handleSendMessage}
      message={message}
      setMessage={setMessage}
      selectedConversation={selectedConversation}
      setSelectedConversation={setSelectedConversation}
    />
  );
};

export default InboxPage;
