"use client";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { useState } from "react";

export function SignIn({
  email,
  setEmail,
  password,
  setPassword,
  handleLogin,
  error,
}) {
  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <div className="flex min-h-screen">
      <div className="flex-1 bg-gradient-to-b from-[#6a11cb] to-[#2575fc] flex flex-col justify-center items-center p-8 text-white">
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
          Discover a platform where your interests and hobbies connect you with like-minded individuals. Whether you are looking to learn from experts or share your knowledge, our community is here to support your growth.
        </p>
      </div>
      <div className="flex-1 flex flex-col justify-center items-center p-8">
        <Image src="/assets/logo.png" alt="Logo" width={200} height={100} />

        {/* Hidden Dummy Field to Avoid Autofill */}
        <input type="text" name="fakeusernameremembered" style={{ display: "none" }} />

        <div className="space-y-4 w-full max-w-md">
          <div className="space-y-2">
            <Label htmlFor="signin-email">Email</Label>
            <Input
              id="signin-email"
              name="user_email"
              placeholder="Your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              type="email"
              autoComplete="new-email"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="signin-password">Password</Label>
            <div className="relative">
              <Input
                id="signin-password"
                name="user_pass"
                placeholder="Your password"
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
          {error && <p className="text-red-500 text-xs italic">{error}</p>}
          <Button
            className="w-full bg-purple-500 hover:bg-purple-600 text-white"
            onClick={handleLogin}
          >
            SIGN IN
          </Button>
        </div>

        {/* Another Hidden Dummy Field */}
        <input type="password" name="fakepasswordremembered" style={{ display: "none" }} />
      </div>
    </div>
  );
}

function EyeIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
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
