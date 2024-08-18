import React from 'react';
import { Input } from '@/components/ui/input';

const SearchBar = ({ value, onChange }) => {
  return (
    <div className="p-4 text-black bg-purple-300">
      <Input 
        type="text" 
        placeholder="Search ..." 
        value={value} // Bind search query value
        onChange={onChange} // Trigger search query update on change
      />
    </div>
  );
};

export default SearchBar;
