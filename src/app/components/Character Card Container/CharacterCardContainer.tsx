"use client";
import React, { useContext, useEffect, useState } from "react";
import { Character, CharacterPagination } from "@/types/characters";
import { getCharacterData } from "@/services/characterService";
import { CharacterCard } from "../Character Card/CharacterCard";
import { CharacterContext } from "@/app/context/CharacterContext";

import "./character-card-container.css";
import { Pagination } from "../Pagination/Pagination";
export const CharacterCardContainer = () => {
  const [characterData, setCharacterData] = useState<Character[]>([]);
  const [paginationData, setPaginationData] = useState<CharacterPagination>();

  const [page, setPage] = useState<string>("1");

  const getCharactherData = async (page: string) => {
    let allData = await getCharacterData(page);
    if (allData) {
      setPaginationData(allData?.info);
      setCharacterData(allData?.results);
    }
  };

  useEffect(() => {
    getCharactherData(page);
  }, [page]);

  const characterContext = useContext(CharacterContext);

  if (!characterContext) {
    throw new Error(
      "CharacterCardContainer must be used within a CharacterSelectProvider"
    );
  }

  const { characterSelect, setCharacterSelect } = characterContext;

  const selectCharacter = (character: Character) => {
    // You can change the number of characters to be selected, if you do so, you must also change it in the < Home.tsx /> component.
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

  const handleChangePage = (page: number) => {
    setPage(page.toString());
  };

  const prevPage = () => {
    if (paginationData?.prev) {
      let prev = paginationData.prev.split("=")[1];
      setPage(prev);
    }
  };

  const nextPage = () => {
    if (paginationData?.next) {
      let next = paginationData.next.split("=")[1];
      setPage(next);
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
