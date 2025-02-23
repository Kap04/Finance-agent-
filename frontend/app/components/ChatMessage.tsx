import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface ChatMessageProps {
  content: string;
  role: 'user' | 'assistant';
}

export default function ChatMessage({ content, role }: ChatMessageProps) {
  return (
    <div className={`py-8 ${role === 'assistant' ? 'bg-gray-800' : ''}`}>
      <div className="max-w-3xl mx-auto flex gap-4 px-4">
        {/* Avatar */}
        <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0">
          {role === 'assistant' ? (
            <div className="bg-teal-500 w-full h-full rounded-full flex items-center justify-center">
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
          ) : (
            <div className="bg-gray-500 w-full h-full rounded-full flex items-center justify-center">
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
          )}
        </div>

        {/* Message Content */}
        <div className="min-w-0 prose prose-invert max-w-none">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              table: (props) => (
                <div className="my-4 overflow-x-auto rounded-lg border border-gray-700">
                  <table className="min-w-full divide-y divide-gray-700" {...props} />
                </div>
              ),
              thead: (props) => (
                <thead className="bg-gray-800" {...props} />
              ),
              tbody: (props) => (
                <tbody className="divide-y divide-gray-700 bg-gray-900" {...props} />
              ),
              tr: (props) => (
                <tr className="transition-colors hover:bg-gray-800/50" {...props} />
              ),
              td: (props) => (
                <td className="whitespace-nowrap px-4 py-3 text-sm" {...props} />
              ),
              th: (props) => (
                <th className="whitespace-nowrap px-4 py-3 text-left text-sm font-medium text-gray-300" {...props} />
              ),
            }}
          >
            {content}
          </ReactMarkdown>
        </div>
      </div>
    </div>
  );
} 