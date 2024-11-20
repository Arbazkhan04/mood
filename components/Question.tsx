'use client';

import { useState, useEffect } from 'react';
import { askQuestion } from '@/utlis/api';

const Question = () => {
  const [value, setValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState('');
  const [displayedResponse, setDisplayedResponse] = useState('');

  const onChange = (e) => setValue(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResponse(''); // Clear previous response
    setDisplayedResponse(''); // Reset displayed response

    try {
      const answer = await askQuestion(value);
      setResponse(answer?.trim() || 'No response available.'); // Ensure valid response
    } catch (error) {
      console.error('Error fetching response:', error);
      setResponse('An error occurred. Please try again.');
    } finally {
      setLoading(false);
      setValue('');
    }
  };

  useEffect(() => {
    if (response) {
      let index = 0;
      const interval = setInterval(() => {
        if (index < response.length) {
          setDisplayedResponse((prev) => prev + response[index]);
          index++;
        } else {
          clearInterval(interval); // Stop the interval when all characters are added
        }
      }, 25); // Adjust typing speed (25ms per character)
      return () => clearInterval(interval);
    }
  }, [response]);

  return (
    <div className="bg-gradient-to-r from-blue-50 to-white shadow-md rounded-2xl p-8 max-w-lg mx-auto transform transition hover:scale-105">
      <h2 className="text-3xl font-extrabold text-gray-800 mb-4 text-center">
        🤔 Ask a Question
      </h2>
      <form onSubmit={handleSubmit} className="flex items-center gap-3">
        <input
          disabled={loading}
          onChange={onChange}
          value={value}
          type="text"
          placeholder="What's on your mind?"
          className="flex-grow border-2 border-gray-200 px-4 py-3 rounded-full text-gray-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300 transition"
        />
        <button
          disabled={loading}
          type="submit"
          className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-6 py-3 rounded-full font-medium shadow-lg hover:shadow-xl transition-transform transform hover:scale-110 focus:ring-4 focus:ring-blue-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? '...' : 'Ask'}
        </button>
      </form>
      {(loading || response) && (
        <div className="mt-6 p-4 bg-gray-100 rounded-xl border-l-4 border-blue-500 shadow-inner">
          <h3 className="text-lg font-bold text-gray-700">Response:</h3>
          {loading && (
            <p className="text-gray-500 italic animate-pulse">Generating response...</p>
          )}
          {response && (
            <p className="text-gray-600 mt-2 whitespace-pre-wrap">{displayedResponse}</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Question;
