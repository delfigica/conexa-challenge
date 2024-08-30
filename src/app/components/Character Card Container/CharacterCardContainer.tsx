"use client";
import React, { useEffect, useState } from "react";
import { Character } from "@/types/characters";
import { getAllCharacters } from "@/services/characterService";
import { CharacterCard } from "../Character Card/CharacterCard";

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

  const [selectedCharacterList, setSelectedCharacterList] = useState<
    Character[]
  >([]);

  const selectCharacter = (character: Character) => {
    let lengthCharacterSelectList = 2;
    if (selectedCharacterList.includes(character)) {
      let index = selectedCharacterList.indexOf(character);
      let newList = [
        ...selectedCharacterList.slice(0, index),
        ...selectedCharacterList.slice(index + 1),
      ];
      setSelectedCharacterList(newList);
    } else if (selectedCharacterList.length >= lengthCharacterSelectList) {
      let newList = [...selectedCharacterList.slice(1), character];
      setSelectedCharacterList(newList);
    } else if (selectedCharacterList.length < lengthCharacterSelectList) {
      let newList = [...selectedCharacterList, character];
      setSelectedCharacterList(newList);
    }
  };

  return (
    <div className="character-card-container">
      {characterData.map((character) => (
        <CharacterCard
          key={character.id}
          character={character}
          handleSelectCharacter={selectCharacter}
          characterSelected={selectedCharacterList}
        />
      ))}
    </div>
  );
};
