import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const NewConversationModal = ({ toggleModal, setRecipient, handleCreateConversation }) => {
  const [newRecipient, setNewRecipient] = useState("");

  const handleStartConversation = () => {
    console.log('handleStartConversation called');  // Debugging

    if (newRecipient) {
      console.log('New recipient:', newRecipient);  // Debugging
      setRecipient(newRecipient);
      handleCreateConversation(newRecipient);
      toggleModal();
    } else {
      console.log('No recipient provided');  // Debugging
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm">
        <h2 className="text-xl font-semibold mb-4">Start New Conversation</h2>
        <Input
          type="text"
          placeholder="Enter username"
          value={newRecipient}
          onChange={(e) => setNewRecipient(e.target.value)}
          className="mb-4"
        />
        <div className="flex justify-end">
          <Button variant="ghost" className="mr-2" onClick={toggleModal}>
            Cancel
          </Button>
          <Button onClick={handleStartConversation}>
            Start
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NewConversationModal;
