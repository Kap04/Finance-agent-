import Link from 'next/link';

export default function Sidebar() {
  return (
    <div className="w-64 h-screen bg-gray-900 text-white p-4 flex flex-col">
      {/* Logo/Title Area */}
      <div className="flex items-center gap-2 mb-4">
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
        <span className="font-semibold text-lg">Finance Agent</span>
      </div>

      {/* New Chat Button */}
      <button className="mb-4 flex items-center gap-2 w-full px-3 py-2 rounded border border-white/20 hover:bg-gray-800 transition-colors">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
        New Chat
      </button>

      {/* History Section */}
      <div className="flex-1 overflow-y-auto">
        <div className="text-sm text-gray-400 mb-2">Today</div>
        <div className="space-y-1">
          <Link href="#" className="block px-3 py-2 rounded hover:bg-gray-800 transition-colors text-sm truncate">
            Market Analysis Discussion
          </Link>
          <Link href="#" className="block px-3 py-2 rounded hover:bg-gray-800 transition-colors text-sm truncate">
            Stock Performance Review
          </Link>
        </div>
      </div>

      {/* User Section */}
      <div className="mt-auto pt-4 border-t border-white/20">
        <button className="flex items-center gap-2 w-full px-3 py-2 rounded hover:bg-gray-800 transition-colors">
          <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <span className="text-sm">User Account</span>
        </button>
      </div>
    </div>
  );
} 