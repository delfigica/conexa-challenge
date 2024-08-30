"use client";
import React, { useContext, useEffect, useState } from "react";
import { Character } from "@/types/characters";
import { getAllCharacters } from "@/services/characterService";
import { CharacterCard } from "../Character Card/CharacterCard";
import { CharacterContext } from "@/app/context/CharacterContext";

import "./character-card-container.css";
export const CharacterCardContainer = () => {
  const [characterData, setCharacterData] = useState<Character[]>([]);

  const getCharactherData = async () => {
    let data = await getAllCharacters();
    setCharacterData(data);
  };

  useEffect(() => {
    getCharactherData();
  }, []);

  const characterContext = useContext(CharacterContext);

  if (!characterContext) {
    throw new Error(
      "CharacterCardContainer must be used within a CharacterSelectProvider"
    );
  }

  const { characterSelect, setCharacterSelect } = characterContext;

  const selectCharacter = (character: Character) => {
    let lengthCharacterSelectList = 2;
    if (characterSelect.includes(character)) {
      let index = characterSelect.indexOf(character);
      let newList = [
        ...characterSelect.slice(0, index),
        ...characterSelect.slice(index + 1),
      ];
      setCharacterSelect(newList);
    } else if (characterSelect.length >= lengthCharacterSelectList) {
      let newList = [...characterSelect.slice(1), character];
      setCharacterSelect(newList);
    } else if (characterSelect.length < lengthCharacterSelectList) {
      let newList = [...characterSelect, character];
      setCharacterSelect(newList);
    }
  };

  return (
    <div className="character-card-container">
      {characterData.map((character) => (
        <CharacterCard
          key={character.id}
          character={character}
          handleSelectCharacter={selectCharacter}
          characterSelected={characterSelect}
        />
      ))}
    </div>
  );
};
