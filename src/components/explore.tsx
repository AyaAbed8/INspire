import { useState } from "react";

interface Interest {
  label: string;
  img: string;
}

interface ExploreProps {
  selectedInterests: string[];
  onInterestChange: (interest: string) => void;
  onNextClick: () => void;
}

export default function Explore({
  selectedInterests,
  onInterestChange,
  onNextClick,
}: ExploreProps) {
  const interests: Interest[] = [
    { label: "COMPUTER ENGINEERING", img: "/assets/interests/computer.jpeg" },
    { label: "ELECTRICAL ENGINEERING", img: "/assets/interests/electrical.jpeg" },
    { label: "MECHANICAL ENGINEERING", img: "/assets/interests/mechanical.webp" },
    { label: "CIVIL ENGINEERING", img: "/assets/interests/civil.webp" },
    { label: "BUSINESS MANAGEMENT", img: "/assets/interests/business.jpeg" },
    { label: "ARCHITECTURE & DESIGN", img: "/assets/interests/architecture.jpeg" },
    { label: "SOFTWARE DEVELOPMENT", img: "/assets/interests/software.avif" },
    { label: "MARKETING & ENTREPRENEURSHIP", img: "/assets/interests/marketing.jpeg" },
    { label: "DATA SCIENCE & AI", img: "/assets/interests/datascience.jpeg" },
    { label: "MUSIC", img: "/assets/interests/music.jpeg" },
    { label: "VISUAL ARTS", img: "/assets/interests/visualarts.webp" },
    { label: "WRITING & JOURNALISM", img: "/assets/interests/writing.jpeg" },
    { label: "CULINARY ARTS", img: "/assets/interests/culinary.jpeg" },
    { label: "FILM & MEDIA PRODUCTION", img: "/assets/interests/film.jpeg" },
    { label: "FINANCE & ECONOMICS", img: "/assets/interests/econ.webp" },
    { label: "SPORTS & FITNESS", img: "/assets/interests/fitness.avif" }
  ];

  return (
    <div className="flex flex-col items-center justify-center w-full min-h-screen bg-gradient-to-r from-purple-500 to-blue-500">
      <div className="flex items-center justify-center space-x-6 mt-4">
        <div className="flex flex-col items-center space-y-2">
          <UserIcon className="w-10 h-10 text-yellow-400" />
          <span className="text-white text-sm">Create account</span>
        </div>
        <div className="h-0.5 w-12 bg-gray-300" />
        <div className="flex flex-col items-center space-y-2">
          <CameraIcon className="w-10 h-10 text-yellow-400" />
          <span className="text-white text-sm">Set your Interests</span>
        </div>
        <div className="h-0.5 w-12 bg-gray-300" />
        <div className="flex flex-col items-center space-y-2">
          <UsersIcon className="w-10 h-10 text-gray-300" />
          <span className="text-gray-300 text-sm">Connect!</span>
        </div>
      </div>
      <div className="bg-white p-4 mt-4 rounded-lg shadow-lg w-full max-w-4xl">
        <h2 className="text-center text-lg font-semibold mb-4">
          Choose your interests
        </h2>
        <div className="grid grid-cols-4 gap-2">
          {interests.map((interest, index) => (
            <div
              key={index}
              className="flex flex-col items-center space-y-1 cursor-pointer text-center"
              onClick={() => onInterestChange(interest.label)}
            >
              <div className="relative">
                <img
                  src={interest.img}
                  alt={interest.label}
                  className="w-20 h-20 rounded-full"
                />
                {selectedInterests.includes(interest.label) && (
                  <CheckIcon className="absolute w-5 h-5 text-white bg-blue-500 rounded-full top-1 right-1" />
                )}
              </div>
              <span
                className={`text-xs font-medium leading-tight ${
                  selectedInterests.includes(interest.label)
                    ? 'text-blue-500'
                    : ''
                }`}
              >
                {interest.label}
              </span>
            </div>
          ))}
        </div>
        <div className="flex justify-center mt-4">
          <button
            onClick={onNextClick}
            className="px-4 py-1 bg-slate-300 hover:bg-slate-400 text-slate-700 font-bold rounded"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

// Icons

function CameraIcon(props: any) {
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
      <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" />
      <circle cx="12" cy="13" r="3" />
    </svg>
  );
}

function CheckIcon(props: any) {
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
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

function UserIcon(props: any) {
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
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}

function UsersIcon(props: any) {
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
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}

function RightArrowIcon(props: any) {
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
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  );
}
