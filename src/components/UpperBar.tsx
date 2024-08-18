// components/UpperBar.js
import React from 'react';
import { Input } from './ui/input';

const UpperBar = () => {
  return (
    <div className="flex items-center justify-between p-4 bg-purple-600 text-white">
      <div className="flex items-center space-x-4">
        <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
        <Input type="text" placeholder="Search for Mentors" className="bg-white text-black p-2 rounded-md" />
      </div>
      <div className="flex items-center space-x-4">
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89-3.26a2 2 0 011.85 0L21 8m-2 2v6a2 2 0 01-2 2H7a2 2 0 01-2-2v-6m-4 0v6a4 4 0 004 4h10a4 4 0 004-4v-6" />
        </svg>
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4h16M4 8h16M4 12h16m-7 4h7" />
        </svg>
      </div>
    </div>
  );
};

export default UpperBar;
