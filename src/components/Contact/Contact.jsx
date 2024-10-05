import { useEffect, useState } from 'react';
import axios from 'axios';
import API_ROUTES from '../../utils/routes'; // Assuming routes.js contains the API endpoints

const Contact = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('development');

  useEffect(() => {
    fetchContacts();
  }, []);

  // Fetch all contacts using axios
  const fetchContacts = async () => {
    try {
      const response = await axios.get(API_ROUTES.getAllContacts, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
        },
      });
      setContacts(response.data);
      setLoading(false);
    } catch (err) {
      setError('Failed to load contacts');
      setLoading(false);
    }
  };

  const filteredContacts = contacts.filter(contact => contact.type === activeTab);

  if (loading) return <Preloader />;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-semibold text-center mb-6">Contact List</h1>
      
      {/* Tab Navigation */}
      <div className="flex justify-center mb-4">
        <button 
          onClick={() => setActiveTab('development')} 
          className={`px-4 py-2 rounded-l-lg transition-colors duration-300 ${activeTab === 'development' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
        >
          Development
        </button>
        <button 
          onClick={() => setActiveTab('security')} 
          className={`px-4 py-2 rounded-r-lg transition-colors duration-300 ${activeTab === 'security' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
        >
          Security
        </button>
      </div>

      {/* Contacts Table */}
      <table className="min-w-full border border-gray-300">
        <thead>
          <tr>
            <th className="border border-gray-300 p-2 bg-blue-600 text-white">Name</th>
            <th className="border border-gray-300 p-2 bg-blue-600 text-white">Email</th>
            <th className="border border-gray-300 p-2 bg-blue-600 text-white">Message</th>
            <th className="border border-gray-300 p-2 bg-blue-600 text-white">Created At</th>
          </tr>
        </thead>
        <tbody>
          {filteredContacts.map((contact) => (
            <tr key={contact._id} className="hover:bg-gray-100 transition-colors duration-200">
              <td className="border border-gray-300 p-2">{contact.name}</td>
              <td className="border border-gray-300 p-2">{contact.email}</td>
              <td className="border border-gray-300 p-2">{contact.message}</td>
              <td className="border border-gray-300 p-2">{new Date(contact.createdAt).toLocaleString()}</td>
            </tr>
          ))}
          {filteredContacts.length === 0 && (
            <tr>
              <td colSpan="4" className="text-center border border-gray-300 p-2 text-gray-500">No contacts found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

// Preloader component
const Preloader = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-600 border-solid"></div>
    </div>
  );
};

export default Contact;
