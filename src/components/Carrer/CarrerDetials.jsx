import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link, useNavigate } from 'react-router-dom';

const CareerDetails = () => {
  const { id } = useParams(); // Get the career ID from the URL parameters
  const [career, setCareer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCareerDetails();
  }, [id]);

  const fetchCareerDetails = async () => {
    const BASE_URL = import.meta.env.VITE_BASE_URL; // Assuming BASE_URL is defined in your .env file
    const url = `${BASE_URL}/careers/${id}`; // Construct the URL for fetching career details

    try {
      const response = await axios.get(url, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`, // Use API key for authentication
        },
      });
      setCareer(response.data); // Set the career data in state
      setLoading(false); // Set loading to false
    } catch (err) {
      setError('Failed to load career details'); // Set error if fetching fails
      setLoading(false); // Set loading to false
    }
  };

  const handleDelete = async () => {
    const BASE_URL = import.meta.env.VITE_BASE_URL; // Assuming BASE_URL is defined in your .env file
    const url = `${BASE_URL}/careers/${id}`; // Construct the URL for deleting the career

    try {
      await axios.delete(url, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`, // Use API key for authentication
        },
      });
      navigate('/careers'); // Redirect to the career list after deletion
    } catch (err) {
      setError('Failed to delete the career posting'); // Set error if deletion fails
    }
  };

  if (loading) return <div className="text-center">Loading...</div>; // Show loading indicator
  if (error) return <div className="text-red-500">{error}</div>; // Show error message

  return (
    <div className="p-6">
      <h1 className="text-3xl font-semibold mb-4">{career.title}</h1>
      <div className="text-gray-800 mb-4" dangerouslySetInnerHTML={{ __html: career.description }} />
      {/* Show job description */}

      <div className="mb-4">
        <h2 className="text-xl font-medium">Qualifications</h2>
        <p>{career.qualifications}</p>
      </div>

      <div className="mb-4">
        <h2 className="text-xl font-medium">Responsibilities</h2>
        <p>{career.responsibilities}</p>
      </div>

      <div className="mb-4">
        <h2 className="text-xl font-medium">Skills</h2>
        <p>{career.skills.join(', ')}</p> {/* Join skills with commas */}
      </div>

      <div className="mb-4">
        <h2 className="text-xl font-medium">Benefits</h2>
        <p>{career.benefits}</p>
      </div>

      <div className="mb-4">
        <h2 className="text-xl font-medium">Location</h2>
        <p>{career.location}</p>
      </div>

      <div className="mb-4">
        <h2 className="text-xl font-medium">Job Type</h2>
        <p>{career.jobType}</p>
      </div>

      <div className="mb-4">
        <h2 className="text-xl font-medium">Salary Range</h2>
        <p>{career.salaryRange}</p>
      </div>

      <div className="mb-4">
        <h2 className="text-xl font-medium">Application Deadline</h2>
        <p>{new Date(career.applicationDeadline).toLocaleString()}</p> {/* Format the application deadline */}
      </div>

      <div className="mb-4">
        <h2 className="text-xl font-medium">Experience</h2>
        <p>{career.experience}</p>
      </div>

      <div className="mb-4">
        <h2 className="text-xl font-medium">Job Category</h2>
        <p>{career.jobCategory}</p>
      </div>

      <div className="mb-4">
        <h2 className="text-xl font-medium">Remote</h2>
        <p>{career.remote ? 'Yes' : 'No'}</p>
      </div>

      <div className="mb-4">
        <h2 className="text-xl font-medium">Company</h2>
        <p>{career.company}</p>
      </div>

      <div className="mb-4">
        <h2 className="text-xl font-medium">Company Website</h2>
        <a href={career.companyWebsite} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
          {career.companyWebsite}
        </a>
      </div>

      <div className="mb-4">
        <h2 className="text-xl font-medium">Application Link</h2>
        <a href={career.applicationLink} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
          {career.applicationLink}
        </a>
      </div>

      <div className="mb-4">
        <h2 className="text-xl font-medium">Contact Email</h2>
        <p>{career.contactEmail}</p>
      </div>

      <div className="mb-4">
        <h2 className="text-xl font-medium">Posted By</h2>
        <p>{career.postedBy.name} ({career.postedBy.email})</p>
      </div>

      <div className="mb-4">
        <h2 className="text-xl font-medium">Posted At</h2>
        <p>{new Date(career.createdAt).toLocaleString()}</p> {/* Format the createdAt date */}
      </div>

      <div className="mb-4">
        <h2 className="text-xl font-medium">Updated At</h2>
        <p>{new Date(career.updatedAt).toLocaleString()}</p> {/* Format the updatedAt date */}
      </div>

      <div className="flex space-x-4">
        <Link to={`/careers/edit/${career._id}`} className="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700 transition duration-300">
          Edit
        </Link>
        <button onClick={handleDelete} className="px-4 py-2 text-white bg-red-600 rounded hover:bg-red-700 transition duration-300">
          Delete
        </button>
      </div>
    </div>
  );
};

export default CareerDetails;
