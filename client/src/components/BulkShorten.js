import React, { useState } from 'react';
import Papa from 'papaparse';
import { useHistory } from 'react-router-dom';

function BulkShorten({ addShortenedUrl, user }) {
  const [file, setFile] = useState(null);
  const [error, setError] = useState('');
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!user) {
      setError('Please sign in.');
      history.push('/');
      return;
    }
    if (!file) {
      setError('Please upload a CSV file.');
      return;
    }
    Papa.parse(file, {
      complete: (result) => {
        result.data.forEach((row) => {
          if (row[0]) { // Assume first column is long URL
            const shortUrl = `tinyurl.com/${Math.random().toString(36).slice(2, 9)}`;
            addShortenedUrl({ longUrl: row[0], shortUrl, alias: '', clicks: 0 });
          }
        });
        history.push('/dashboard');
      },
      header: false,
    });
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Bulk Shorten URLs</h2>
      <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
        <div className="mb-4">
          <label className="block text-gray-700">Upload CSV (long URLs in first column)</label>
          <input
            type="file"
            accept=".csv"
            onChange={(e) => setFile(e.target.files[0])}
            className="w-full p-2 border rounded"
          />
        </div>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
        >
          Shorten URLs
        </button>
      </form>
    </div>
  );
}

export default BulkShorten;