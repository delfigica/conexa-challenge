import axios from "axios";

// Base URL for the Rick and Morty API
const URL = "https://rickandmortyapi.com/api/character";

import {
  Character,
  CharacterApiResponse,
  CharacterPagination,
} from "../types/characters";

// Function to fetch all characters with pagination
export const getAllCharacters = async (
  page: string = '1'
): Promise<Character[]> => {
  try {
    // Fetching characters from the API with pagination
    const response = await axios.get<CharacterApiResponse>(
      `${URL}/?page=${page}`
    );
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

// Function to fetch character data including pagination info
export const getCharacterData = async (
  page: string = '1'
): Promise<CharacterApiResponse | null> => {
  try {
    // Fetching character data from the API with pagination info
    const response = await axios.get<CharacterApiResponse>(
      `${URL}/?page=${page}`
    );

    return response.data;
  } catch (error) {
    console.log("Error fetching all characters:", error);
    return null;
  }
};

// Function to fetch a single character by ID
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

