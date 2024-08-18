import React, { useState } from 'react';
import PostCard from '../components/PostCard';

const Home = ({ posts, onConnectToMentor, currentUserId }) => {
  const [searchQuery, setSearchQuery] = useState('');

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredPosts = posts.filter(post => {
    // Check if the search query matches the author's name, post content, or any of the tags
    const matchesAuthor = post.author?.name?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesContent = post.message?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTags = post.tags?.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesAuthor || matchesContent || matchesTags;
  });

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="p-4">
        {/* Search bar at the top */}
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search for users, tags, or keywords..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredPosts.length === 0 ? (
            <p>No posts available</p>
          ) : (
            filteredPosts.map((post, index) => (
              <PostCard 
                key={index} 
                {...post} 
                onConnectToMentor={onConnectToMentor} 
                currentUserId={currentUserId} // Pass currentUserId to PostCard
                userId={post.author?._id} // Pass author ID to PostCard, if available
                time={post.timestamp}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
