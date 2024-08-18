import { useState } from 'react';
import { useRouter } from 'next/router';
import { SignUp } from '@/src/components/sign-up';

const SignUpPage = () => {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState('');
  const [country, setCountry] = useState('');
  const [role, setRole] = useState('mentee');
  const [password, setPassword] = useState('');
  const [selectedCountry, setSelectedCountry] = useState<string>("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');


  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/graphql', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: `
            mutation CreateUser($body: InputUserType!) {
              createUser(body: $body) {
                _id
                name
                email
                age
                country
                role
                interests
              }
            }
          `,
          variables: {
            body: {
              name,
              email,
              age: parseInt(age),
              country,
              role,
              password,
            },
          },
        }),
      });

      const data = await res.json();
      if (res.status !== 200 || data.errors) {
        throw new Error(data.errors[0].message || 'Failed to create user');
      }

      const createdUser = data.data.createUser;
      setSuccessMessage(`User ${createdUser.name} created successfully!`);

      // Store user in localStorage
      localStorage.setItem('user', JSON.stringify({
        _id: createdUser._id,
        name: createdUser.name,
        email: createdUser.email,
        age: createdUser.age,
        country: createdUser.country,
        role: createdUser.role,
        interests: createdUser.interests || [],
      }));

      // Clear form fields
      setName('');
      setEmail('');
      setAge('');
      setRole('mentee');
      setPassword('');

      // Redirect to the "Choose Your Interests" page
      router.push('/chooseInterests');

    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <SignUp
      handleSubmit={handleSubmit}
      name={name}
      setName={setName}
      email={email}
      setEmail={setEmail}
      age={age}
      setAge={setAge}
      country={country}
      setCountry={setCountry}
      role={role}
      setRole={setRole}
      password={password}
      setPassword={setPassword}
      selectedCountry={selectedCountry}
      setSelectedCountry={setSelectedCountry}
      togglePasswordVisibility={togglePasswordVisibility}
      passwordVisible={passwordVisible}
      error={error}
      successMessage={successMessage}
    />
  );
};

export default SignUpPage;
