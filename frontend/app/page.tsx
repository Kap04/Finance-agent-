'use client';

import { useState } from 'react';
import Sidebar from './components/Sidebar';
import ChatMessage from './components/ChatMessage';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export default function Home() {
  const [query, setQuery] = useState<string>('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    const userMessage = { role: 'user' as const, content: query };
    setMessages(prev => [...prev, userMessage]);
    setQuery('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query: userMessage.content }),
      });

      const data = await res.json();
      
      if (!res.ok) {
        throw new Error(data.error || 'Failed to get analysis');
      }

      const assistantMessage = { role: 'assistant' as const, content: data.result };
      setMessages(prev => [...prev, assistantMessage]);
    } catch (err) {
      const errorMessage = { 
        role: 'assistant' as const, 
        content: `Error: ${err instanceof Error ? err.message : 'An error occurred while analyzing'}`
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-screen bg-gray-900 text-white">
      <Sidebar />
      
      <main className="flex-1 flex flex-col relative">
        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto">
          {messages.length === 0 ? (
            <div className="h-full flex items-center justify-center">
              <div className="text-center space-y-4">
                <h1 className="text-4xl font-bold">Finance Agent</h1>
                <p className="text-gray-400">Ask me anything about financial markets and analysis</p>
              </div>
            </div>
          ) : (
            messages.map((message, index) => (
              <ChatMessage key={index} {...message} />
            ))
          )}
        </div>

        {/* Input Form */}
        <div className="border-t border-white/20 p-4">
          <form onSubmit={handleSubmit} className="max-w-3xl mx-auto relative">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full p-4 pr-12 rounded-lg bg-gray-800 text-white border border-white/20 focus:border-teal-500 focus:ring-2 focus:ring-teal-500 focus:outline-none"
              placeholder="Ask about financial markets..."
              disabled={isLoading}
            />
            <button 
              type="submit" 
              className="absolute right-3 top-1/2 -translate-y-1/2 p-2 text-gray-400 hover:text-white disabled:opacity-50"
              disabled={isLoading || !query.trim()}
            >
              {isLoading ? (
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
              ) : (
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
                </svg>
              )}
            </button>
          </form>
        </div>
      </main>
    </div>
  );
} 