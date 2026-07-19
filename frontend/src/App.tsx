import { useState } from 'react';
import { Dashboard, Analytics, Insights, Reports } from './pages';

import { Navigation } from './components';
import './App.css';

function App() {
  const [currentPage, setCurrentPage] = useState('dashboard');

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard />;
      case 'analytics':
        return <Analytics />;
      case 'insights':
        return <Insights />;
      case 'reports':
        return <Reports />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navigation currentPage={currentPage} onNavigate={setCurrentPage} />
      <main className="max-w-7xl mx-auto py-6 px-4">
        {renderPage()}
      </main>
    </div>
  );
}

export default App;
