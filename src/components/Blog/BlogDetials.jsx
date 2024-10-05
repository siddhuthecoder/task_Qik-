import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link, useNavigate } from 'react-router-dom';

const BlogDetails = () => {
  const { id } = useParams(); // Get the blog ID from the URL parameters
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchBlogDetails();
  }, [id]);

  const fetchBlogDetails = async () => {
    const BASE_URL = import.meta.env.VITE_BASE_URL; // Assuming BASE_URL is defined in your .env file
    const url = `${BASE_URL}/blogs/${id}`; // Construct the URL for fetching blog details

    try {
      const response = await axios.get(url, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`, // Use API key for authentication
        },
      });
      setBlog(response.data); // Set the blog data in state
      setLoading(false); // Set loading to false
    } catch (err) {
      setError('Failed to load blog details'); // Set error if fetching fails
      setLoading(false); // Set loading to false
    }
  };

  const handleDelete = async () => {
    const BASE_URL = import.meta.env.VITE_BASE_URL; // Assuming BASE_URL is defined in your .env file
    const url = `${BASE_URL}/blogs/${id}`; // Construct the URL for deleting the blog

    try {
      await axios.delete(url, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`, // Use API key for authentication
        },
      });
      navigate('/blog'); // Redirect to the blog list after deletion
    } catch (err) {
      setError('Failed to delete the blog post'); // Set error if deletion fails
    }
  };

  if (loading) return <div className="text-center">Loading...</div>; // Show loading indicator
  if (error) return <div className="text-red-500">{error}</div>; // Show error message

  return (
    <div className="p-6">
      <h1 className="text-3xl font-semibold mb-4">{blog.title}</h1>
      <img src={blog.image} alt={blog.title} className="w-full h-64 object-cover mb-4" />
      
      <div className="text-gray-800 mb-4" dangerouslySetInnerHTML={{ __html: blog.shortContent }} />
 {/* Show short content */}
      {/* https://drive.google.com/drive/folders/1HOisQKXaMyBh2UqtV6IQOeXHVQxvcik9 */}
      <div className="text-gray-600 mb-4">
        <h2 className="text-xl font-medium">Content</h2>
        <div dangerouslySetInnerHTML={{ __html: blog.content }} /> {/* Display detailed content as HTML */}
      </div>

      {/* Display additional blog details */}
      <div className="mb-4">
        <h2 className="text-xl font-medium">Author</h2>
        <p>{blog.author.name} ({blog.author.email})</p>
      </div>

      <div className="mb-4">
        <h2 className="text-xl font-medium">Categories</h2>
        <p>{blog.categories.join(', ')}</p> {/* Join categories with commas */}
      </div>

      <div className="mb-4">
        <h2 className="text-xl font-medium">Tags</h2>
        <p>{blog.tags.join(', ')}</p> {/* Join tags with commas */}
      </div>

      <div className="mb-4">
        <h2 className="text-xl font-medium">Status</h2>
        <p>{blog.status}</p>
      </div>

      <div className="mb-4">
        <h2 className="text-xl font-medium">Created At</h2>
        <p>{new Date(blog.createdAt).toLocaleString()}</p> {/* Format the createdAt date */}
      </div>

      <div className="mb-4">
        <h2 className="text-xl font-medium">Updated At</h2>
        <p>{new Date(blog.updatedAt).toLocaleString()}</p> {/* Format the updatedAt date */}
      </div>

      <div className="flex space-x-4">
        <Link to={`/blog/edit/${blog._id}`} className="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700 transition duration-300">
          Edit
        </Link>
        <button onClick={handleDelete} className="px-4 py-2 text-white bg-red-600 rounded hover:bg-red-700 transition duration-300">
          Delete
        </button>
      </div>
    </div>
  );
};

export default BlogDetails;
