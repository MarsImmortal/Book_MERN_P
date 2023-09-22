import React, { useState } from 'react';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import axios from 'axios';
import { Navigate, useNavigate } from 'react-router-dom';

const CreateBooks = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [publishYear, setPublishYear] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null); // State for handling errors
  const navigate = useNavigate();

  const handleSaveBook = () => {
    setError(null); // Reset the error state
    const data = {
      title,
      author,
      publishYear,
    };

    // Add form validation here if needed

    setLoading(true);
    axios
      .post('http://localhost:3003/books', data)
      .then((res) => {
        setLoading(false);
        navigate('/'); // Navigate to home page
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
        setError('An error occurred while saving the book.'); // Set an error message
      });
  };

  return (
    <div className="p-4">
      <BackButton />
      <h1 className="text-3xl my-4">Create New Book</h1>
      {loading ? <Spinner /> : ''}
      <div className="flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto">
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border-2 border-gray-500 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-sky-600 focus:border-transparent"
          />
        </div>
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Author</label>
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className="border-2 border-gray-500 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-sky-600 focus:border-transparent"
          />
        </div>
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Publish Year</label>
          <input
            type="number"
            value={publishYear}
            onChange={(e) => setPublishYear(e.target.value)}
            className="border-2 border-gray-500 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-sky-600 focus:border-transparent"
          />
        </div>
        <button className="p-2 bg-sky-300 m-8" onClick={handleSaveBook}>
          Save
        </button>
      </div>
      {error && <p className="text-red-500">{error}</p>} {/* Render error message */}
    </div>
  );
};

export default CreateBooks;
