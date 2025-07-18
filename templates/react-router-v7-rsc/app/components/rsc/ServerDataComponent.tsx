// React Server Component - runs only on the server
// Note: React Router v7 does not yet have native RSC support
// This component demonstrates what RSC would look like when supported

import type { PropsWithChildren } from 'react';

// This would be a React Server Component when RSC is supported
// Server Components can access server-side resources directly
async function ServerDataComponent({ children }: PropsWithChildren) {
  // In a real RSC implementation, this could:
  // - Access databases directly
  // - Read files from the filesystem
  // - Call APIs without exposing keys to the client
  // - Perform server-side computations
  
  // Simulated server-side data fetching
  const serverData = {
    timestamp: new Date().toISOString(),
    serverInfo: 'This data was generated on the server',
    // In a real RSC, this could be database data, file content, etc.
  };

  return (
    <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
      <h3 className="text-lg font-semibold text-blue-800 mb-2">
        React Server Component (Experimental)
      </h3>
      <p className="text-sm text-blue-600 mb-2">
        <strong>Note:</strong> React Router v7 does not yet support RSC natively. 
        This component demonstrates the concept.
      </p>
      <div className="bg-white p-3 rounded border">
        <p className="text-sm">
          <strong>Server Timestamp:</strong> {serverData.timestamp}
        </p>
        <p className="text-sm">
          <strong>Server Info:</strong> {serverData.serverInfo}
        </p>
      </div>
      {children}
    </div>
  );
}

export default ServerDataComponent;