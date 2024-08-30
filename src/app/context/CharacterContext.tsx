'use client'
import { Character } from "@/types/characters";
import { createContext, useState, ReactNode } from "react";

interface CharacterContextType {
  characterSelect: Character[];
  setCharacterSelect: React.Dispatch<React.SetStateAction<Character[]>>;
}

const CharacterContext = createContext<CharacterContextType | undefined>(undefined);

export function CharacterSelectProvider({ children }: { children: ReactNode }) {
  const [characterSelect, setCharacterSelect] = useState<Character[]>([]);

  return (
    <CharacterContext.Provider value={{ characterSelect, setCharacterSelect }}>
      {children}
    </CharacterContext.Provider>
  );
}

export { CharacterContext };