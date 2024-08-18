import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

const Layout = ({ children }) => {
  const [userName, setUserName] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    // Check if window is defined (browser environment)
    if (typeof window !== 'undefined') {
      const storedUser = JSON.parse(localStorage.getItem('user'));
      if (storedUser && storedUser.name) {
        setUserName(storedUser.name);
      } else {
        setUserName(null);
      }
    }
  }, [router.asPath]); // Rerun this effect on route change

  return (
    <div>
      <header className="flex justify-between items-center p-4 bg-gray-800 text-white">
        <div className="text-lg font-bold">MyApp</div>
        <div className="text-sm">
          {userName ? (
            <div>Welcome, {userName}!</div>
          ) : (
            <div>
              <a href="/login" className="hover:underline">Login</a>
            </div>
          )}
        </div>
      </header>
      <main>{children}</main>
    </div>
  );
};

export default Layout;
