"use client";
import React, { useContext, useEffect, useState } from "react";
import { CharacterContext } from "@/app/context/CharacterContext";

import { Character, CharacterPagination } from "@/types/characters";
import { getCharacterData } from "@/services/characterService";

import { Pagination } from "../Pagination/Pagination";
import { CharacterCard } from "../Character Card/CharacterCard";

import "./character-card-container.css";

export const CharacterCardContainer = () => {
  // State to store character data and pagination information
  const [characterData, setCharacterData] = useState<Character[]>([]);
  const [paginationData, setPaginationData] = useState<CharacterPagination>();

  // State to manage the current page number (as a string)
  const [page, setPage] = useState<string>("1");

  // Function to fetch character data based on the current page
  const getCharactherData = async (page: string) => {
    let allData = await getCharacterData(page);
    if (allData) {
      setPaginationData(allData?.info); // Set pagination data as Character Pagination (@/types/characters")
      setCharacterData(allData?.results); // Set character data (array of characters)
    }
  };

  // useEffect to fetch character data when the page state changes
  useEffect(() => {
    getCharactherData(page);
  }, [page]);

  // Accessing the CharacterContext to get the selected characters and the function to update them
  const characterContext = useContext(CharacterContext);
  if (!characterContext) {
    throw new Error(
      "CharacterCardContainer must be used within a CharacterSelectProvider"
    );
  }
  const { characterSelect, setCharacterSelect } = characterContext;

  // Function to handle the selection of a character
  const selectCharacter = (character: Character) => {
    // Define the maximum number of characters that can be selected (If you need to update it, do it also in Home Component)
    let lengthCharacterSelectList = 2;

    if (characterSelect.includes(character)) {
      // If the character is already selected, remove it from the selection
      let index = characterSelect.indexOf(character);
      let newList = [
        ...characterSelect.slice(0, index),
        ...characterSelect.slice(index + 1),
      ];
      setCharacterSelect(newList);
    } else if (characterSelect.length >= lengthCharacterSelectList) {
      // If the selection list is full, remove the oldest selection and add the new one
      let newList = [...characterSelect.slice(1), character];
      setCharacterSelect(newList);
    } else if (characterSelect.length < lengthCharacterSelectList) {
      // If there is still space, add the new character to the selection
      let newList = [...characterSelect, character];
      setCharacterSelect(newList);
    }
  };

  // Function to handle page change when a specific page is selected
  const handleChangePage = (page: number) => {
    setPage(page.toString());
  };

  // Function to navigate to the previous page
  const prevPage = () => {
    if (paginationData?.prev) {
      let prev = paginationData.prev.split("=")[1];
      setPage(prev);
    }
  };

  // Function to navigate to the next page
  const nextPage = () => {
    if (paginationData?.next) {
      let next = paginationData.next.split("=")[1];
      setPage(next);
    }
  };

  return (
    <div className="character-card-container">
      {/* Render CharacterCard for each character */}
      {characterData.map((character) => (
        <CharacterCard
          key={character.id}
          character={character}
          handleSelectCharacter={selectCharacter}
          characterSelected={characterSelect}
        />
      ))}

      {/* Render Pagination component if pagination data is available */}
      {paginationData && (
        <Pagination
          prevPage={prevPage}
          nextPage={nextPage}
          totalPages={paginationData?.pages}
          currentPage={Number(page)}
          changePage={handleChangePage}
        />
      )}
    </div>
  );
};
