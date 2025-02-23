'use client';

import { useState } from 'react';
import ReactMarkdown from 'react-markdown';

export default function Home() {
  const [query, setQuery] = useState<string>('');
  const [response, setResponse] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setResponse('');
    setIsLoading(true);

    try {
      console.log('Submitting query:', query); // Debug log
      
      const res = await fetch('/api/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query }),
      });

      const data = await res.json();
      console.log('Received response:', data); // Debug log
      
      if (!res.ok) {
        throw new Error(data.error || 'Failed to get analysis');
      }

      setResponse(data.result);
    } catch (err) {
      console.error('Error:', err); // Debug log
      setError(err instanceof Error ? err.message : 'An error occurred while analyzing');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Financial Analysis Tool</h1>
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="flex gap-2">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 p-2 border rounded text-black"
            placeholder="Enter your query"
            disabled={isLoading}
          />
          <button 
            type="submit" 
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-400"
            disabled={isLoading}
          >
            {isLoading ? 'Analyzing...' : 'Analyze'}
          </button>
        </div>
      </form>
      
      {error && (
        <div className="p-4 mb-4 bg-red-100 text-red-700 rounded">
          Error: {error}
        </div>
      )}
      
      {response && (
        <div className="mt-4">
          <h2 className="text-xl font-semibold mb-2">Analysis Result:</h2>
          <div className="p-4 bg-gray-100 rounded">
            <div className="prose prose-sm max-w-none text-black dark:prose-invert">
              <ReactMarkdown
                components={{
                  table: (props) => (
                    <div className="overflow-x-auto">
                      <table className="min-w-full table-auto border-collapse border border-gray-300" {...props} />
                    </div>
                  ),
                  td: (props) => <td className="border border-gray-300 p-2" {...props} />,
                  th: (props) => <th className="border border-gray-300 p-2 bg-gray-100" {...props} />,
                }}
              >
                {response}
              </ReactMarkdown>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 