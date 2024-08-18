import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

function AttachmentIcon() {
  return (
    <svg
      className="h-6 w-6"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M10 9V14C10 15.1046 10.8954 16 12 16V16C13.1046 16 14 15.1046 14 14V7C14 4.79086 12.2091 3 10 3V3C7.79086 3 6 4.79086 6 7V15C6 18.3137 8.68629 21 12 21V21C15.3137 21 18 18.3137 18 15V5"
        stroke="#000000"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </svg>
  );
}

const MessageInput = ({ message, setMessage, handleSendMessage }) => {
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  return (
    <div className="flex items-center p-2 border-t">
      <Button variant="ghost" className="mr-2">
        <AttachmentIcon />
      </Button>
      <Input
        type="text"
        placeholder="Type a message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyPress={handleKeyPress}
        className="flex-1"
      />
      <Button onClick={handleSendMessage} className="ml-2">
        Send
      </Button>
    </div>
  );
};

export default MessageInput;
