import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import ReactQuill from 'react-quill'; // Import React Quill
import 'react-quill/dist/quill.snow.css'; // Import styles for React Quill
import API_ROUTES from '../../utils/routes'; // Adjust the path as needed

const CreateBlog = () => {
  const [title, setTitle] = useState('');
  const [shortContent, setShortContent] = useState('');
  const [content, setContent] = useState('');
  const [categories, setCategories] = useState('');
  const [tags, setTags] = useState('');
  const [status, setStatus] = useState('draft');
  const [imageUrl, setImageUrl] = useState(''); // Added state for image URL
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Log current state before submission
    console.log('Submitting Blog:', {
      title,
      shortContent,
      content,
      categories: categories.split(',').map(category => category.trim()),
      tags: tags.split(',').map(tag => tag.trim()),
      status,
      imageUrl, // Include image URL in log
    });

    // Create a newBlog object with the image URL
    const newBlog = {
      title,
      shortContent,
      content,
      categories: categories.split(',').map(category => category.trim()),
      tags: tags.split(',').map(tag => tag.trim()),
      status,
      image:imageUrl, // Include image URL in submission
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

  // Define the toolbar options for React Quill
  const modules = {
    toolbar: [
      [{ 'header': [1, 2, false] }], // Header options
      ['bold', 'italic', 'underline'], // Formatting options
      ['link', 'image', 'video'], // Link and media options
      [{ 'list': 'ordered' }, { 'list': 'bullet' }], // List options
      ['clean'], // Remove formatting button
    ],
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
          <ReactQuill 
            value={shortContent}
            onChange={setShortContent}
            modules={modules} // Pass the custom modules
            className="mt-1 block w-full"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Content</label>
          <ReactQuill 
            value={content}
            onChange={setContent}
            modules={modules} // Pass the custom modules
            className="mt-1 block w-full"
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
          <label className="block text-sm font-medium">Image URL</label> {/* New image URL input */}
          <input
            type="text"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            placeholder="Enter image URL"
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
            <option value="archived">Archived</option> {/* Added Archived option */}
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
