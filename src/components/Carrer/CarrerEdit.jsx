import { useEffect, useState } from 'react';
import axios from 'axios';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './CreateCareer.css';
// import API_ROUTES from '../../utils/routes';
import { useParams } from 'react-router-dom';

const EditCareer = () => {
    const BASE_URL = import.meta.env.VITE_BASE_URL;
    const { jobId } = useParams(); // Get job ID from URL params
    console.log({jobId})
    // const navigate = useNavigate(); // For navigating after edit
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        qualifications: '',
        responsibilities: '',
        skills: [],
        benefits: '',
        location: '',
        jobType: 'Full-Time',
        salaryRange: '',
        applicationDeadline: '',
        experience: '',
        jobCategory: 'Other',
        applicationLink: '',
        contactEmail: '',
        remote: false,
        company: '',
        companyWebsite: '',
        applicationInstructions: '',
    });
    
    const url = `${BASE_URL}/careers/${jobId}`;                         
    useEffect(() => {
        // Fetch existing job data on component mount
        const fetchJobData = async () => {
            try {
                const response = await axios.get(url, {
                    headers: {
                        Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
                    },
                });
                setFormData(response.data);
            } catch (error) {
                console.error('Error fetching job data', error);
            }
        };

        fetchJobData();
    }, [jobId]);

    // Handle Quill changes for rich text fields
    const handleQuillChange = (field, value) => {
        setFormData({ ...formData, [field]: value });
    };

    // Handle changes for standard input fields
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    // Handle changes for skills input
    const handleSkillsChange = (e) => {
        const value = e.target.value;
        const skillsArray = value.split(',').map(skill => skill.trim()).filter(skill => skill); // Split, trim, and filter out empty strings
        setFormData({ ...formData, skills: skillsArray });
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(url, formData, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
                },
            });

            alert('Career updated successfully', response.data);
            window.location.reaload()
        } catch (error) {
            console.error('Error updating career', error.response.data);
        }
    };

    return (
        <div className="max-w-3xl mx-auto overflow-y-auto h-screen p-8 bg-gray-100 shadow-lg rounded-lg">
            <form onSubmit={handleSubmit} className="space-y-6">
                <h2 className="text-2xl font-bold mb-4 text-blue-600">Edit Job Posting</h2>

                {/* Job Title */}
                <div>
                    <label className="block text-gray-700 font-medium mb-2">Job Title</label>
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        required
                        className="form-input w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-300"
                    />
                </div>

                {/* Job Description */}
                <div>
                    <label className="block text-gray-700 font-medium mb-2">Job Description</label>
                    <ReactQuill
                        value={formData.description}
                        onChange={(value) => handleQuillChange('description', value)}
                        className="quill-editor animate-quill-focus"
                    />
                </div>

                {/* Qualifications */}
                <div>
                    <label className="block text-gray-700 font-medium mb-2">Qualifications</label>
                    <ReactQuill
                        value={formData.qualifications}
                        onChange={(value) => handleQuillChange('qualifications', value)}
                        className="quill-editor animate-quill-focus"
                    />
                </div>

                {/* Responsibilities */}
                <div>
                    <label className="block text-gray-700 font-medium mb-2">Responsibilities</label>
                    <ReactQuill
                        value={formData.responsibilities}
                        onChange={(value) => handleQuillChange('responsibilities', value)}
                        className="quill-editor animate-quill-focus"
                    />
                </div>

                {/* Skills */}
                <div>
                    <label className="block text-gray-700 font-medium mb-2">Skills (Separate with commas)</label>
                    <input
                        type="text"
                        name="skills"
                        onChange={handleSkillsChange}
                        // value={formData.skills} // Join the skills array for display
                        className="form-input w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-300"
                        placeholder="e.g., JavaScript, Python, Java"
                    />
                </div>

                {/* Benefits */}
                <div>
                    <label className="block text-gray-700 font-medium mb-2">Benefits</label>
                    <ReactQuill
                        value={formData.benefits}
                        onChange={(value) => handleQuillChange('benefits', value)}
                        className="quill-editor animate-quill-focus"
                    />
                </div>

                {/* Location */}
                <div>
                    <label className="block text-gray-700 font-medium mb-2">Location</label>
                    <input
                        type="text"
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        required
                        className="form-input w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-300"
                    />
                </div>

                {/* Job Type */}
                <div>
                    <label className="block text-gray-700 font-medium mb-2">Job Type</label>
                    <select
                        name="jobType"
                        value={formData.jobType}
                        onChange={handleChange}
                        className="form-select w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-300"
                    >
                        <option value="Full-Time">Full-Time</option>
                        <option value="Part-Time">Part-Time</option>
                        <option value="Contract">Contract</option>
                        <option value="Internship">Internship</option>
                    </select>
                </div>

                {/* Salary Range */}
                <div>
                    <label className="block text-gray-700 font-medium mb-2">Salary Range</label>
                    <input
                        type="text"
                        name="salaryRange"
                        value={formData.salaryRange}
                        onChange={handleChange}
                        className="form-input w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-300"
                    />
                </div>

                {/* Application Deadline */}
                <div>
                    <label className="block text-gray-700 font-medium mb-2">Application Deadline</label>
                    <input
                        type="date"
                        name="applicationDeadline"
                        value={formData.applicationDeadline.split('T')[0]} // Convert to YYYY-MM-DD format
                        onChange={handleChange}
                        className="form-input w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-300"
                    />
                </div>

                {/* Experience */}
                <div>
                    <label className="block text-gray-700 font-medium mb-2">Experience</label>
                    <input
                        type="text"
                        name="experience"
                        value={formData.experience}
                        onChange={handleChange}
                        className="form-input w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-300"
                    />
                </div>

                {/* Job Category */}
                <div>
                    <label className="block text-gray-700 font-medium mb-2">Job Category</label>
                    <select
                        name="jobCategory"
                        value={formData.jobCategory}
                        onChange={handleChange}
                        className="form-select w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-300"
                    >
                        <option value="Engineering">Engineering</option>
                        <option value="Marketing">Marketing</option>
                        <option value="Human Resources">Human Resources</option>
                        <option value="Finance">Finance</option>
                        <option value="Sales">Sales</option>
                        <option value="Other">Other</option>
                    </select>
                </div>

                {/* Company Name */}
                <div>
                    <label className="block text-gray-700 font-medium mb-2">Company Name</label>
                    <input
                        type="text"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        required
                        className="form-input w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-300"
                    />
                </div>

                {/* Company Website */}
                <div>
                    <label className="block text-gray-700 font-medium mb-2">Company Website</label>
                    <input
                        type="url"
                        name="companyWebsite"
                        value={formData.companyWebsite}
                        onChange={handleChange}
                        className="form-input w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-300"
                    />
                </div>

                {/* Contact Email */}
                <div>
                    <label className="block text-gray-700 font-medium mb-2">Contact Email</label>
                    <input
                        type="email"
                        name="contactEmail"
                        value={formData.contactEmail}
                        onChange={handleChange}
                        required
                        className="form-input w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-300"
                    />
                </div>

                {/* Application Instructions */}
                <div>
                    <label className="block text-gray-700 font-medium mb-2">Application Instructions</label>
                    <ReactQuill
                        value={formData.applicationInstructions}
                        onChange={(value) => handleQuillChange('applicationInstructions', value)}
                        className="quill-editor animate-quill-focus"
                    />
                </div>

                {/* Remote Option */}
                <div className="flex items-center">
                    <input
                        type="checkbox"
                        name="remote"
                        checked={formData.remote}
                        onChange={handleChange}
                        className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring focus:ring-blue-300"
                    />
                    <label className="ml-2 text-gray-700">Remote</label>
                </div>

                {/* Submit Button */}
                <div>
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white font-semibold py-2 px-4 rounded-md shadow hover:bg-blue-700 transition duration-200"
                    >
                        Update Job
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EditCareer;
