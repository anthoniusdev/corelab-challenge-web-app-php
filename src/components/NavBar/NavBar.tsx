import React, { useState } from 'react';

type NavbarProps = {
  onSearch: (searchTerm: string) => void;
};

const Navbar: React.FC<NavbarProps> = ({onSearch}) => {
  const [searchTerm, setSearchTerm] = useState<string>('');

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearch(value);
  };

  return (
    <nav className="flex w-full items-center px-4 lg:px-9 py-2 bg-white shadow-sm border-b border-gray-200">
      <div className="flex items-center space-x-2">
        <img 
          src="/img/image.png" 
          alt="CoreNotes" 
          className="w-6 h-6 lg:w-12 lg:h-12 mr-4 object-contain"
        />
        <span className="text-gray-800 text-sm lg:text-xl">CoreNotes</span>
      </div>

      <div className="flex mx-12 w-200">
        <div className="relative w-full mx-auto rounded-md shadow-md">
          <input
            type="text"
            placeholder="Pesquisar notas"
            value={searchTerm}
              onChange={handleSearch}
            className="w-full px-3 py-1.5 bg-gray-50 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-gray-400"
          />
          <button className="absolute right-0 top-0 h-full px-3 text-gray-500">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
        </div>
      </div>

    <button className="ml-auto text-gray-500 hover:text-gray-700 cursor-pointer flex items-center">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </nav>
  );
};

export default Navbar;