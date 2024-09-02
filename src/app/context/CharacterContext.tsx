"use client";
import { Character } from "@/types/characters";
import { createContext, useState, ReactNode } from "react";

// Define the shape of the context data
interface CharacterContextType {
  characterSelect: Character[]; // Array of selected characters
  setCharacterSelect: React.Dispatch<React.SetStateAction<Character[]>>; // Function to update the selected characters
}

// Create the context with an undefined initial value
const CharacterContext = createContext<CharacterContextType | undefined>(
  undefined
);

// The provider component to wrap around parts of the app that need access to the character selection state
export function CharacterSelectProvider({ children }: { children: ReactNode }) {
  const [characterSelect, setCharacterSelect] = useState<Character[]>([]); // State to keep track of the selected characters

  return (
    <CharacterContext.Provider value={{ characterSelect, setCharacterSelect }}>
      {children}{" "}
      {/* Render the children components that will have access to this context */}
    </CharacterContext.Provider>
  );
}

export { CharacterContext };
