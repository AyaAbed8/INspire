import { useEffect, useState } from 'react';
import Home from '@/src/components/home';
import CreatePostForm from '../../components/CreatePostForm';
import Header from '@/src/components/Header';
import { useRouter } from 'next/router';
import Explore from '../../components/Explore'; // Importing Explore to access the interests

const DashboardPage = () => {
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showCreatePostForm, setShowCreatePostForm] = useState(false);
  const router = useRouter();

  const interests = [
    { label: "COMPUTER ENGINEERING", img: "/assets/interests/computer.jpeg" },
    { label: "ELECTRICAL ENGINEERING", img: "/assets/interests/electrical.jpeg" },
    { label: "MECHANICAL ENGINEERING", img: "/assets/interests/mechanical.webp" },
    { label: "CIVIL ENGINEERING", img: "/assets/interests/civil.webp" },
    { label: "BUSINESS MANAGEMENT", img: "/assets/interests/business.jpeg" },
    { label: "ARCHITECTURE & DESIGN", img: "/assets/interests/architecture.jpeg" },
    { label: "SOFTWARE DEVELOPMENT", img: "/assets/interests/software.avif" },
    { label: "MARKETING & ENTREPRENEURSHIP", img: "/assets/interests/marketing.jpeg" },
    { label: "DATA SCIENCE & AI", img: "/assets/interests/datascience.jpeg" },
    { label: "MUSIC", img: "/assets/interests/music.jpeg" },
    { label: "VISUAL ARTS", img: "/assets/interests/visualarts.webp" },
    { label: "WRITING & JOURNALISM", img: "/assets/interests/writing.jpeg" },
    { label: "CULINARY ARTS", img: "/assets/interests/culinary.jpeg" },
    { label: "FILM & MEDIA PRODUCTION", img: "/assets/interests/film.jpeg" },
    { label: "FINANCE & ECONOMICS", img: "/assets/interests/econ.webp" },
    { label: "SPORTS & FITNESS", img: "/assets/interests/fitness.avif" }
  ];

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      setUser(storedUser);
      fetchPosts(storedUser);
    } else {
      console.error('User not defined');
      setLoading(false);
    }
  }, []);

  const fetchPosts = async (storedUser) => {
    try {
      const res = await fetch('/api/graphql', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: `
            query {
              listPosts {
                _id
                content
                tags
                timestamp
                author {
                  _id
                  name
                  role
                }
              }
            }
          `,
        }),
      });

      const { data, errors } = await res.json();
      
      if (errors) {
        console.error('GraphQL errors:', errors);
        return;
      }

      if (data && data.listPosts) {
        const formattedPosts = data.listPosts.map(post => ({
          ...post,
          author: post.author, // Pass the entire author object
          title: post.tags.join(', '),
          time: new Date(post.timestamp).toLocaleString(),
          message: post.content,
          role: post.author.role,
        }));
        setPosts(formattedPosts);
      }
    } catch (error) {
      console.error('Failed to fetch posts:', error);
    } finally {
      setLoading(false);
    }
  };

  const handlePostCreated = (newPost) => {
    const formattedPost = {
      ...newPost,
      author: newPost.author, // Pass the entire author object
      title: newPost.tags.join(', '),
      time: new Date(newPost.timestamp).toLocaleString(),
      message: newPost.content,
      role: newPost.author.role,
    };
    setPosts(prevPosts => [formattedPost, ...prevPosts]);
  };

  const handleConnectToMentor = async (recipientName) => {
    try {
      const res = await fetch('/api/graphql', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: `
            query ($userId: ID!, $recipientName: String!) {
              getConversationBetweenUsers(userId: $userId, recipientName: $recipientName) {
                _id
              }
            }
          `,
          variables: {
            userId: user._id,
            recipientName: recipientName
          },
        }),
      });

      const { data, errors } = await res.json();

      if (errors || !data.getConversationBetweenUsers) {
        console.error('Failed to fetch or create conversation', errors);
        return;
      }

      const conversationId = data.getConversationBetweenUsers._id;

      // Redirect to the conversation page
      router.push(`/inbox/${conversationId}`);
    } catch (error) {
      console.error('Error connecting to mentor:', error);
    }
  };

  if (loading || !user) {
    return <div>Loading user information...</div>;
  }

  return (
    <div className="dashboard-page">
      <Header />
      <div className="p-4 bg-gray-100">
        <button
          onClick={() => setShowCreatePostForm(!showCreatePostForm)}
          className="bg-purple-600 text-white px-4 py-2 rounded-md mb-4"
        >
          {showCreatePostForm ? 'Cancel' : 'Create Post'}
        </button>
        {showCreatePostForm && (
          <CreatePostForm user={user} onPostCreated={handlePostCreated} interests={interests} />
        )}
        <div className="mt-6">
          <Home posts={posts} onConnectToMentor={handleConnectToMentor} currentUserId={user?._id} />
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
