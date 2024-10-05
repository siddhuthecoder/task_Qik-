// routes.js

// Base URL
const BASE_URL = 'http://localhost:8000/api';

// API Endpoints
const API_ROUTES = {
    // Admin Routes
    createAdmin: `${BASE_URL}/admins`,
    loginAdmin: `${BASE_URL}/admins/login`,
    getAdmins: `${BASE_URL}/admins`,
    getAdminById: (id) => `${BASE_URL}/admins/${id}`,
    updateAdmin: (id) => `${BASE_URL}/admins/${id}`,
    deleteAdmin: (id) => `${BASE_URL}/admins/${id}`,

    // Contact Routes
    addContact: `${BASE_URL}/contacts`,
    getAllContacts: `${BASE_URL}/contacts`,

    // Career/Job Routes
    getAllJobs: `${BASE_URL}/careers`,
    getJobById: (id) => `${BASE_URL}/careers/${id}`,
    createJob: `${BASE_URL}/careers`,
    updateJob: (id) => `${BASE_URL}/careers/${id}`,
    deleteJob: (id) => `${BASE_URL}/careers/${id}`,

    // Blog Routes
    getAllBlogs: `${BASE_URL}/blogs`,
    getBlogById: (id) => `${BASE_URL}/blogs/${id}`,
    createBlog: `${BASE_URL}/blogs`,
    updateBlog: (id) => `${BASE_URL}/blogs/${id}`,
    deleteBlog: (id) => `${BASE_URL}/blogs/${id}`
};

// Export the routes object for use in your Vite app
export default API_ROUTES;
