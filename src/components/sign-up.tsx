"use client";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import CountrySelect from "./CountryDropdown";
import Image from "next/image";
import Link from "next/link";

export function SignUp({
  handleSubmit,
  name,
  setName,
  email,
  setEmail,
  age,
  setAge,
  country,
  setCountry,
  role,
  setRole,
  password,
  setPassword,
  error,
  successMessage,
  selectedCountry,
  setSelectedCountry,
  togglePasswordVisibility,
  passwordVisible,
}) {

  const handleCountryChange = (countryCode: string) => {
    setSelectedCountry(countryCode);
    setCountry(countryCode); // Update the country state
  };

  return (
    <div className="flex min-h-screen">
      {/* Left Side - Banner and Slogan */}
      <div className="w-1/2 bg-gradient-to-b from-[#6a11cb] to-[#2575fc] flex flex-col justify-center items-center p-8 text-white">
        <div className="w-[300px] h-[300px] overflow-hidden mb-8">
          <Image
            src="/assets/hero-sign-in.png"
            alt="Illustration"
            className="w-full h-full"
            width={300}
            height={300}
          />
        </div>
        <h1 className="text-2xl font-bold mb-4 text-center">
          Join our community of passionate learners and experienced mentors
        </h1>
        <p className="text-center max-w-md font-extralight">
          Discover a platform where your interests and hobbies connect you with
          like-minded individuals. Whether you are looking to learn from experts
          or share your knowledge, our community is here to support your growth.
        </p>
      </div>

      {/* Right Side - Sign Up Form */}
      <div className="w-1/2 flex flex-col justify-center items-center p-8 bg-white">
        <Image src="/assets/logo.png" alt="Logo" width={200} height={100} className="mb-4" />

        <form onSubmit={handleSubmit} className="space-y-4 w-full max-w-md" autoComplete="off">
          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              placeholder="Enter a username"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              autoComplete="off"
            />
          </div>
          <div className="flex space-x-4 mb-8">
            {/* Mentor Option */}
            <input
              type="radio"
              id="mentor"
              name="role"
              value="mentor"
              checked={role === "mentor"}
              onChange={(e) => setRole(e.target.value)}
              className="radio-button"
              autoComplete="off"
            />
            <Label
              htmlFor="mentor"
              className="text-sm font-medium leading-none"
            >
              Register as Mentor
            </Label>

            {/* Mentee Option */}
            <input
              type="radio"
              id="mentee"
              name="role"
              value="mentee"
              checked={role === "mentee"}
              onChange={(e) => setRole(e.target.value)}
              className="radio-button"
              autoComplete="off"
            />
            <Label
              htmlFor="mentee"
              className="text-sm font-medium leading-none"
            >
              Register as Mentee
            </Label>
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              type="email"
              autoComplete="off"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Input
                id="password"
                placeholder="Choose a password"
                type={passwordVisible ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="new-password"
              />
              <EyeIcon
                className="absolute right-2.5 top-2.5 h-4 w-4 text-muted-foreground cursor-pointer"
                onClick={togglePasswordVisibility}
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="age">Age</Label>
            <Input
              id="age"
              placeholder="Enter your age"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              type="number"
              required
              autoComplete="off"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>
            <div className="rounded-md p-2">
              <CountrySelect
                value={selectedCountry}
                onChange={handleCountryChange}
                className="w-full bg-transparent outline-none text-gray-500"
              />
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="terms" defaultChecked />
            <Label htmlFor="terms" className="text-sm font-medium leading-none">
              I accept the terms & conditions
            </Label>
          </div>
          <Button type="submit" className="w-full bg-purple-500 hover:bg-purple-600 text-white">
            SIGN UP
          </Button>
          {error && <p className="text-red-500">{error}</p>}
          {successMessage && <p className="text-green-500">{successMessage}</p>}
        </form>

        {/* Redirect to Login Page */}
        <p className="mt-8 text-sm text-gray-600">
          Own an Account?{" "}
          <Link href="/login" className="font-bold text-black">
              JUMP RIGHT IN
          </Link>
        </p>
      </div>
    </div>
  );
}

function EyeIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}
