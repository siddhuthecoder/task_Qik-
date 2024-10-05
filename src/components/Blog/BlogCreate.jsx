import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import API_ROUTES from '../../utils/routes'; // Adjust the path as needed

const CreateBlog = () => {
  const [title, setTitle] = useState('');
  const [shortContent, setShortContent] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState(''); // Base64 image string
  const [categories, setCategories] = useState('');
  const [tags, setTags] = useState('');
  const [status, setStatus] = useState('draft');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Function to handle image upload
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    console.log('Selected file:', file); // Log the selected file
    if (file) {
      // Check file size (2MB = 2 * 1024 * 1024 bytes)
      if (file.size > 2 * 1024 * 1024) {
        setError('File size exceeds 2MB');
        setImage(''); // Reset image state if size exceeds limit
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        console.log('FileReader result:', reader.result); // Log the Base64 result
        setImage(reader.result); // Set Base64 string
      };
      reader.readAsDataURL(file); // Convert file to Base64
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Log current state before submission
    console.log('Submitting Blog:', {
      title,
      shortContent,
      content,
      image, // Check if image is set here
      categories: categories.split(',').map(category => category.trim()),
      tags: tags.split(',').map(tag => tag.trim()),
      status,
    });

    // Create a newBlog object
    const newBlog = {
      title,
      shortContent,
      content,
      image, // Ensure this is a Base64 string
      categories: categories.split(',').map(category => category.trim()),
      tags: tags.split(',').map(tag => tag.trim()),
      status,
    };

    try {
      const response = await axios.post(API_ROUTES.createBlog, newBlog, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
        },
      });

      alert(response.data.message);
      navigate('/blog'); // Navigate back to the blog list after creating
    } catch (err) {
      setError(err.response?.data.message || 'Error creating blog post');
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Create New Blog</h1>
      {error && <div className="text-red-500 mb-4">{error}</div>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Title</label>
          <input
            type="text"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Short Content</label>
          <textarea
            required
            value={shortContent}
            onChange={(e) => setShortContent(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Content</label>
          <textarea
            required
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Upload Image (max 2MB)</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="mt-1 block w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Categories (comma-separated)</label>
          <input
            type="text"
            value={categories}
            onChange={(e) => setCategories(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Tags (comma-separated)</label>
          <input
            type="text"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Status</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded"
          >
            <option value="draft">Draft</option>
            <option value="published">Published</option>
          </select>
        </div>
        <button type="submit" className="mt-4 px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700 transition duration-300">
          Create Blog
        </button>
      </form>
    </div>
  );
};

export default CreateBlog;
