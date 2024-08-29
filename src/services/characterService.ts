import axios from "axios";

const URL = "https://rickandmortyapi.com/api/character";

import { Character, CharacterApiResponse } from "../types/characters";

export const getAllCharacters = async (): Promise<Character[]> => {
  try {
    const response = await axios.get<CharacterApiResponse>(URL);

    const characters: Character[] = response.data.results.map((character) => ({
      id: character.id,
      name: character.name,
      status: character.status,
      image: character.image,
      species: character.species,
      episode: character.episode,
    }));
    return characters;
  } catch (error) {
    console.log("Error fetching all characters:", error);
    return [];
  }
};

export const getCharacter = async (id: number): Promise<Character | null> => {
  try {
    const response = await axios.get<Character>(URL + "/" + id);
    const character: Character = {
      id: response.data.id,
      name: response.data.name,
      status: response.data.status,
      image: response.data.image,
      species: response.data.species,
      episode: response.data.episode,
    };
    return character;
  } catch (error) {
    console.log("Error fetching a character:", error);
    return null;
  }
};

export const getTwoCharacters = async (
  id1: number,
  id2: number
): Promise<Character[]> => {
  try {
    const response = await axios.get<Character[]>(`${URL}/${id1},${id2}`);

    const character: Character[] = response.data.map((character) => ({
      id: character.id,
      name: character.name,
      status: character.status,
      image: character.image,
      species: character.species,
      episode: character.episode,
    }));
    return character;
  } catch (error) {
    console.log("Error fetching the characters:", error);
    return [];
  }
};
