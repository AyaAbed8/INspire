import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment, faHeart, faShare, faSave } from '@fortawesome/free-solid-svg-icons';
import { useRouter } from 'next/router';

const LikeIcon = () => <FontAwesomeIcon icon={faHeart} />;
const CommentIcon = () => <FontAwesomeIcon icon={faComment} />;
const ShareIcon = () => <FontAwesomeIcon icon={faShare} />;
const SaveIcon = () => <FontAwesomeIcon icon={faSave} />;

interface PostCardProps {
  author: {
    name: string;
    role: string;
    _id: string;
  };
  title: string;
  time: string;
  message: string;
  image?: string;
  currentUserId: string;
  userId: string;
}

const PostCard = ({ author, title, time, message, image, currentUserId, userId }: PostCardProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const safeDate = (timestamp) => {
    const date = new Date(parseInt(timestamp, 10));
    return isNaN(date.getTime()) ? 'Invalid Date' : date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const handleConnectClick = async () => {
    if (!currentUserId || !userId) {
      console.error("User data is missing:", { currentUserId, userId });
      return;
    }

    setIsLoading(true);

    try {
      console.log("Connecting to:", userId);

      const res = await fetch('/api/graphql', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: `
            query($userId: ID!, $recipientId: ID!) {
              getConversationBetweenUsers(userId: $userId, recipientId: $recipientId) {
                _id
              }
            }
          `,
          variables: {
            userId: currentUserId,
            recipientId: userId,
          },
        }),
      });

      const { data, errors } = await res.json();

      if (errors || !data.getConversationBetweenUsers) {
        console.error('GraphQL errors:', errors);
        console.error('No conversation found or an error occurred:', data);
        return;
      }

      console.log('Conversation found:', data.getConversationBetweenUsers);

      router.push(`/inbox/${data.getConversationBetweenUsers._id}`);
    } catch (error) {
      console.error('Failed to initiate conversation:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md mb-4 h-fit">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-gray-600"
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
          <div>
            <div className="font-bold">
              {author._id === currentUserId ? 'You' : author.name}
            </div>
            <div className="text-sm text-gray-500">{title}</div>
            <div className="text-xs text-gray-400">{safeDate(time)}</div>
          </div>
        </div>
        {author._id !== currentUserId && (
          <button 
            onClick={handleConnectClick}
            className="bg-purple-500 text-white px-3 py-1 rounded-md"
            disabled={!currentUserId || !userId || isLoading}
          >
            {isLoading ? 'Connecting...' : `+ Connect to ${author.role === 'mentor' ? 'Mentor' : 'Mentee'}`}
          </button>
        )}
      </div>
      <div className="mt-4 text-gray-800">{message}</div>
      {image && (
        <img
          src={image}
          alt="Post Image"
          className="mt-4 w-full h-auto object-cover rounded-lg"
        />
      )}
      <div className="flex justify-around mt-4 text-gray-500">
        <button className="flex items-center space-x-1">
          <LikeIcon />
          <span>Like</span>
        </button>
        <button className="flex items-center space-x-1">
          <CommentIcon />
          <span>Comment</span>
        </button>
        <button className="flex items-center space-x-1">
          <ShareIcon />
          <span>Share</span>
        </button>
        <button className="flex items-center space-x-1">
          <SaveIcon />
          <span>Save</span>
        </button>
      </div>
    </div>
  );
};

export default PostCard;
