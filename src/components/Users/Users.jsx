import { useEffect, useState } from 'react';
import axios from 'axios';
import API_ROUTES from '../../utils/routes'; // Assuming routes.js contains the API endpoints
import { useSelector } from 'react-redux';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const user = useSelector((state) => state.auth.user)
  console.log(user)

  useEffect(() => {
    fetchUsers();
  }, []);

  // Fetch all users using axios
  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await axios.get(API_ROUTES.getAdmins, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`
        }
      });
      setUsers(response.data);
      setLoading(false);
    } catch (err) {
      setError('Failed to load users');
      setLoading(false);
    }
  };

  // Delete user by ID using axios
  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this user?')) return;

    try {
      await axios.delete(API_ROUTES.deleteAdmin(id), {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`
        }
      });
      setSuccessMessage('User deleted successfully!');
      fetchUsers(); // Refresh the users list
    } catch (err) {
      setError('Failed to delete user');
    }
  };

  // Handle edit modal opening
  const handleEdit = (user) => {
    setEditingUser(user);
    setFormData({ name: user.name, email: user.email, password: '' });
    setShowModal(true);
  };

  // Handle add user modal opening
  const handleAdd = () => {
    setEditingUser(null);
    setFormData({ name: '', email: '', password: '' });
    setShowModal(true);
  };

  // Handle form submission for both add and edit operations
  const handleSubmit = async () => {
    const url = editingUser ? API_ROUTES.updateAdmin(editingUser._id) : API_ROUTES.createAdmin;
    const method = editingUser ? 'put' : 'post';

    try {
      await axios({
        method: method,
        url: url,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`
        },
        data: formData
      });
      setSuccessMessage(`${editingUser ? 'User updated' : 'User added'} successfully!`);
      setShowModal(false);
      fetchUsers(); // Refresh the users list after submission
    } catch (err) {
      setError('Failed to submit user data');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-600"></div>
      </div>
    );
  }

  if (error) return <div className="text-red-500 text-center">{error}</div>;
  
  if (successMessage) {
    setTimeout(() => {
      setSuccessMessage('');
    }, 3000);
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl text-blue-600 text-center mb-6">Users List</h1>

      {successMessage && <div className="bg-green-500 text-white p-4 rounded mb-4 text-center">{successMessage}</div>}

      <button onClick={handleAdd} className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-500 mb-4 transition duration-200">
        Add User
      </button>

      <table className="min-w-full border border-gray-300">
        <thead>
          <tr>
            <th className="border border-gray-300 p-3 text-left bg-blue-600 text-white">Name</th>
            <th className="border border-gray-300 p-3 text-left bg-blue-600 text-white">Email</th>
            <th className="border border-gray-300 p-3 text-left bg-blue-600 text-white">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id} className="hover:bg-gray-100 transition duration-200">
              <td className="border border-gray-300 p-3">{user.name}</td>
              <td className="border border-gray-300 p-3">{user.email}</td>
              <td className="border border-gray-300 p-3">
                <button onClick={() => handleEdit(user)} className="text-blue-600 hover:underline">Edit</button>
                <button onClick={() => handleDelete(user._id)} className="text-red-600 hover:underline ml-2">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-96">
            <h2 className="text-xl mb-4">{editingUser ? 'Edit User' : 'Add User'}</h2>
            <label className="block mb-2">
              Name:
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="block w-full border border-gray-300 rounded p-2 mt-1"
              />
            </label>
            <label className="block mb-2">
              Email:
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="block w-full border border-gray-300 rounded p-2 mt-1"
              />
            </label>
            <label className="block mb-2">
              Password:
              <input
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="block w-full border border-gray-300 rounded p-2 mt-1"
              />
            </label>
            <button onClick={handleSubmit} className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-500 w-full transition duration-200">
              {editingUser ? 'Update' : 'Add'} User
            </button>
            <button onClick={() => setShowModal(false)} className="bg-gray-300 py-2 px-4 rounded hover:bg-gray-400 w-full mt-2 transition duration-200">
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Users;
