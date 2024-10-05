import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import API_ROUTES from '../../utils/routes'; // Adjust the path as needed

const Career = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const response = await axios.get(API_ROUTES.getAllJobs, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
        },
      });
      setJobs(response.data);
      setLoading(false);
    } catch (err) {
      setError('Failed to load job postings');
      setLoading(false);
    }
  };

  if (loading) return <div className="text-center">Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Career Opportunities</h1>
      <Link
        to="/career/create"
        className="mb-4 inline-block px-4 py-2 text-white bg-green-600 rounded hover:bg-green-700 transition duration-300"
      >
        Post a Job
      </Link>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {jobs.map((job) => (
          <div key={job._id} className="bg-white shadow-md rounded-lg overflow-hidden">
            <div className="p-4">
              <h2 className="text-xl font-semibold">{job.title}</h2>
              <p className="text-gray-800 mb-4">{job.description.replace(/<[^>]+>/g, '')}</p>
              <p className="text-gray-600">Location: {job.location}</p>
              <p className="text-gray-600">Type: {job.jobType}</p>
              <Link
                to={`/career/details/${job._id}`}
                className="inline-block mt-4 px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700 transition duration-300"
              >
                View More
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Career;
