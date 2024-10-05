import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
// import API_ROUTES from '../../utils/routes'; 

const BlogEdit = () => {
  const { id } = useParams(); // Get the blog ID from the URL parameters
  const [title, setTitle] = useState('');
  const [shortContent, setShortContent] = useState('');
  const [content, setContent] = useState('');
  const [categories, setCategories] = useState('');
  const [tags, setTags] = useState('');
  const [status, setStatus] = useState('draft');
  const [imageUrl, setImageUrl] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchBlogDetails();
  }, [id]);

  const fetchBlogDetails = async () => {
    const BASE_URL = import.meta.env.VITE_BASE_URL;
    const url = `${BASE_URL}/blogs/${id}`;

    try {
      const response = await axios.get(url, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
        },
      });
      const blog = response.data;
      setTitle(blog.title);
      setShortContent(blog.shortContent);
      setContent(blog.content);
      setCategories(blog.categories.join(', '));
      setTags(blog.tags.join(', '));
      setStatus(blog.status);
      setImageUrl(blog.image);
    } catch (err) {
      setError('Failed to load blog details');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedBlog = {
      title,
      shortContent,
      content,
      categories: categories.split(',').map(category => category.trim()),
      tags: tags.split(',').map(tag => tag.trim()),
      status,
      image: imageUrl,
    };

    try {
      const BASE_URL = import.meta.env.VITE_BASE_URL;
      const url = `${BASE_URL}/blogs/${id}`;
      const response = await axios.put(url, updatedBlog, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
        },
      });

      alert(response.data.message);
      navigate(`/blog`); // Navigate to the blog details page after editing
    } catch (err) {
      setError(err.response?.data.message || 'Error updating blog post');
    }
  };

  const modules = {
    toolbar: [
      [{ 'header': [1, 2, false] }],
      ['bold', 'italic', 'underline'],
      ['link', 'image', 'video'],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }],
      ['clean'],
    ],
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Edit Blog</h1>
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
            modules={modules}
            className="mt-1 block w-full"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Content</label>
          <ReactQuill
            value={content}
            onChange={setContent}
            modules={modules}
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
          <label className="block text-sm font-medium">Image URL</label>
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
            <option value="archived">Archived</option>
          </select>
        </div>
        <button type="submit" className="mt-4 px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700 transition duration-300">
          Update Blog
        </button>
      </form>
    </div>
  );
};

export default BlogEdit;
