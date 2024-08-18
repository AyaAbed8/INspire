import { useState } from 'react';

const CreatePostForm = ({ user, onPostCreated, interests }) => {
  const [content, setContent] = useState('');
  const [selectedTags, setSelectedTags] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleTagChange = (e) => {
    const selectedTag = e.target.value;

    // Check if the tag is already selected
    if (!selectedTags.includes(selectedTag)) {
      setSelectedTags([...selectedTags, selectedTag]);
    }
  };

  const removeTag = (tagToRemove) => {
    setSelectedTags(selectedTags.filter(tag => tag !== tagToRemove));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    console.log('User before creating post:', user);

    try {
      const res = await fetch('/api/graphql', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: `
            mutation($input: CreatePostInput!) {
              createPost(input: $input) {
                _id
                content
                tags
                timestamp
                author {
                  _id
                  name
                }
              }
            }
          `,
          variables: {
            input: {
              author: user._id,
              content,
              tags: selectedTags,
            },
          },
        }),
      });

      const { data, errors } = await res.json();

      console.log('API response:', data);

      if (errors) {
        console.error('GraphQL errors:', errors);
        setError('Failed to create post. Please try again.');
        return;
      }

      if (data && data.createPost) {
        console.log('Post created:', data.createPost);
        onPostCreated(data.createPost);
        setContent('');
        setSelectedTags([]);
      } else {
        console.error('Failed to create post: No data returned');
        setError('Failed to create post. Please try again.');
      }
    } catch (error) {
      console.error('Failed to create post:', error);
      setError('An error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      {error && <p className="text-red-500 mb-2">{error}</p>}
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="What's on your mind?"
        className="w-full p-2 border rounded mb-4 bg-white"
        required
        disabled={isSubmitting}
      />
      <div className="space-y-2 mb-4">
        <label htmlFor="tags" className="block text-sm font-medium text-gray-700">Tags</label>
        <div className="w-full p-2 border rounded bg-white flex flex-col">
          <select
            id="tags"
            value=""
            onChange={handleTagChange}
            className="bg-transparent outline-none text-gray-500 mb-2"
            disabled={isSubmitting}
          >
            <option value="" disabled>Select a tag</option>
            {interests.map((interest, index) => (
              <option 
                key={index} 
                value={interest.label}
                className={index % 2 === 0 ? 'bg-white' : 'bg-purple-100'}
              >
                {interest.label}
              </option>
            ))}
          </select>
          <div className="flex flex-wrap gap-2">
            {selectedTags.map((tag, index) => (
              <div key={index} className="flex items-center space-x-2 bg-purple-100 text-purple-700 px-3 py-1 rounded-full">
                <span>{tag}</span>
                <button
                  type="button"
                  className="text-purple-500 hover:text-purple-700 focus:outline-none"
                  onClick={() => removeTag(tag)}
                >
                  &times;
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
      <button
        type="submit"
        className={`bg-purple-500 text-white py-2 px-4 rounded ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Posting...' : 'Post'}
      </button>
    </form>
  );
};

export default CreatePostForm;
