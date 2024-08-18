import { useState } from 'react';
import { useRouter } from 'next/router';
import { SignIn } from '@/src/components/sign-in';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (res.ok) {
        const data = await res.json();
        if (data.user) {
          localStorage.setItem('user', JSON.stringify({
            _id: data.user._id, 
            name: data.user.name,
            email: data.user.email,
            age: data.user.age,
            country: data.user.country,
            role: data.user.role,
            interests: data.user.interests || [],
          }));

          router.push('/dashboard');
        } else {
          setError('Failed to retrieve user information');
        }
      } else {
        const { error } = await res.json();
        setError(error || 'Invalid email or password');
      }
    } catch (error) {
      setError('An error occurred. Please try again.');
    }
  };

  return (
    <SignIn
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      handleLogin={handleLogin}
      error={error}
    />
  );
};

export default LoginPage;
