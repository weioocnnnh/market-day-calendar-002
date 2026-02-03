import React from 'react';
import Calendar from './components/Calendar';

const App: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <Calendar />
    </div>
  );
};

export default App;