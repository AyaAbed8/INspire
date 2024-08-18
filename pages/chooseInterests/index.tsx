import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Explore from '@/src/components/explore'; // Import Explore component

const ChooseInterestsPage = () => {
  const router = useRouter();
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    // Get the logged-in user ID from localStorage
    if (typeof window !== 'undefined') {
      const storedUser = JSON.parse(localStorage.getItem('user'));
      if (storedUser && storedUser._id) {
        setUserId(storedUser._id);
        fetchUserInterests(storedUser._id);  // Fetch existing interests
      }
    }
  }, []);

  const fetchUserInterests = async (userId: string) => {
    try {
      const res = await fetch('/api/graphql', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: `
            query($_id: ID!) {
              user(_id: $_id) {
                interests
              }
            }
          `,
          variables: { _id: userId },
        }),
      });

      const { data, errors } = await res.json();
      if (errors) {
        console.error('GraphQL errors:', errors);
        return;
      }

      if (data && data.user && data.user.interests) {
        setSelectedInterests(data.user.interests);
      }
    } catch (error) {
      console.error('Failed to fetch user interests:', error);
    }
  };

  const handleInterestChange = (interest: string) => {
    setSelectedInterests((prev) =>
      prev.includes(interest)
        ? prev.filter((item) => item !== interest)
        : [...prev, interest]
    );
  };

  const handleSubmit = async () => {
    if (!userId) {
      console.error('User ID is not available');
      return;
    }

    try {
      const res = await fetch('/api/graphql', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: `
            mutation($userId: ID!, $interests: [String!]!) {
              updateUserInterests(userId: $userId, interests: $interests) {
                _id
                interests
              }
            }
          `,
          variables: {
            userId,
            interests: selectedInterests,
          },
        }),
      });

      const { data, errors } = await res.json();
      if (errors) {
        console.error('GraphQL errors:', errors);
        return;
      }
      
      console.log('Interests updated:', data.updateUserInterests.interests);

      // Redirect to another page or show a success message
      router.push('/dashboard');
    } catch (error) {
      console.error('Failed to save interests:', error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-purple-500 to-blue-500">
      <Explore
        selectedInterests={selectedInterests}
        onInterestChange={handleInterestChange}
        onNextClick={handleSubmit}
      />
    </div>
  );
};

export default ChooseInterestsPage;
