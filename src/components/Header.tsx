import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

const Header = () => {
  const [user, setUser] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      console.log('Retrieved user from localStorage:', storedUser);
      setUser(storedUser);
    }
  }, []);

  const handleLogout = () => {
    window.location.href = '/signup';
    router.push('/signup');
    //localStorage.removeItem('user');
  };

  const handleNavigation = (path) => {
    router.push(path);
  };

  const isActive = (path) => router.pathname === path;

  return (
    <div className="flex items-center justify-between p-4 bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg">
      <div className="flex items-center">
        <img src="/assets/logo.png" alt="Logo" width={100} height={50} />
      </div>
      <div className="flex items-center space-x-12">
        <button
          className={`relative transition-colors duration-200 ${
            isActive('/dashboard') ? 'text-white' : 'hover:text-purple-300'
          }`}
          onClick={() => handleNavigation('/dashboard')}
        >
          Dashboard
          {isActive('/dashboard') && (
            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-white bg-opacity-75 rounded-t-md transition-transform duration-300 ease-in-out transform scale-x-100" />
          )}
        </button>
        <button
          className={`relative transition-colors duration-200 ${
            isActive('/chooseInterests') ? 'text-white' : 'hover:text-purple-300'
          }`}
          onClick={() => handleNavigation('/chooseInterests')}
        >
          Interests
          {isActive('/chooseInterests') && (
            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-white bg-opacity-75 rounded-t-md transition-transform duration-300 ease-in-out transform scale-x-100" />
          )}
        </button>
        <button
          className={`relative transition-colors duration-200 ${
            isActive('/inbox') ? 'text-white' : 'hover:text-purple-300'
          }`}
          onClick={() => handleNavigation('/inbox')}
        >
          Inbox
          {isActive('/inbox') && (
            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-white bg-opacity-75 rounded-t-md transition-transform duration-300 ease-in-out transform scale-x-100" />
          )}
        </button>
      </div>
      {user && (
        <div className="relative">
          <button
            className="flex items-center space-x-1.5 focus:outline-none"
            onClick={() => setDropdownOpen(!dropdownOpen)}
          >
            <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center mr-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-600"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <circle cx="12" cy="12" r="10" fill="#e5e7eb" />
                <path
                  d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"
                  fill="#374151"
                />
              </svg>
            </div>
            <div>{user.name}</div>
          </button>
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded-md shadow-lg z-20">
              <div className="p-4">
                <p className="font-bold">{user.name}</p>
                <p>{user.email}</p>
                <p>{user.role === 'mentor' ? 'Mentor' : 'Mentee'}</p>
              </div>
              <div className="border-t">
                <button
                  className="w-full text-left p-2 hover:bg-gray-200"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Header;
