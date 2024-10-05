import { useState } from 'react';
import axios from 'axios';
import ReactQuill from 'react-quill'; // Importing the React Quill library
import 'react-quill/dist/quill.snow.css'; // Importing the Quill styles
import './CreateCareer.css'; // Custom styles for animations
import API_ROUTES from '../../utils/routes'; // Adjust the path as needed

const CreateCareer = () => {
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

    const handleQuillChange = (field, value) => {
        setFormData({ ...formData, [field]: value });
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    const handleSkillsChange = (e) => {
        const options = e.target.options;
        const value = [];
        for (let i = 0; i < options.length; i++) {
            if (options[i].selected) {
                value.push(options[i].value);
            }
        }
        setFormData({ ...formData, skills: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(API_ROUTES.createJob, formData, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
                },
            });

            console.log('Career created successfully', response.data);
        } catch (error) {
            console.error('Error creating career', error.response.data);
        }
    };

    return (
        <div className="max-w-3xl mx-auto overflow-y-auto h-screen p-8 bg-gray-100 shadow-lg rounded-lg">
            <form onSubmit={handleSubmit} className="space-y-6">
                <h2 className="text-2xl font-bold mb-4 text-blue-600">Create a New Job Posting</h2>

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
                    <label className="block text-gray-700 font-medium mb-2">Skills (Select multiple)</label>
                    <select
                        name="skills"
                        multiple
                        value={formData.skills}
                        onChange={handleSkillsChange}
                        className="form-select w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-300"
                    >
                        <option value="JavaScript">JavaScript</option>
                        <option value="Python">Python</option>
                        <option value="Java">Java</option>
                        <option value="C++">C++</option>
                        <option value="HTML">HTML</option>
                        <option value="CSS">CSS</option>
                    </select>
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
                        value={formData.applicationDeadline}
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

                {/* Application Link */}
                <div>
                    <label className="block text-gray-700 font-medium mb-2">Application Link</label>
                    <input
                        type="url"
                        name="applicationLink"
                        value={formData.applicationLink}
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
                        className="form-checkbox h-5 w-5 text-blue-600 border-gray-300 rounded"
                    />
                    <label className="ml-2 text-gray-700 font-medium">Remote Option</label>
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white font-semibold py-2 rounded-md hover:bg-blue-700 transition duration-200"
                >
                    Create Job Posting
                </button>
            </form>
        </div>
    );
};

export default CreateCareer;
