import { create } from "zustand";

// Define a custom React hook for managing conversation-related state
const useConversation = create((set) => ({
  // State for the currently selected conversation
  selectedConversation: null,
  // Function to update the selected conversation state
  setSelectedConversation: (selectedConversation) => set({ selectedConversation }),
  // State for storing messages related to the selected conversation
  messages: [],
  // Function to update the messages state
  setMessages: (messages) => set({ messages }),
}));

export default useConversation;
