import axios from "axios";

// Base URL for the Rick and Morty API's episode endpoint
const URL = "https://rickandmortyapi.com/api/episode";

import { Episode, EpisodeApiResponse } from "@/types/episodes";

// Function to fetch all episodes
export const getAllEpisodes = async (): Promise<Episode[]> => {
  try {
    const response = await axios.get<EpisodeApiResponse>(URL);

    // Mapping the response data to the Episode type
    const episodes: Episode[] = response.data.results.map((episode) => ({
      id: episode.id,
      name: episode.name,
      air_date: episode.air_date,
      episode: episode.episode,
      characters: episode.characters,
    }));
    return episodes;
  } catch (error) {
    console.log("Error fetching all episodes: ", error);
    return [];
  }
};

// Function to fetch episodes by their IDs
// Note: IDs should be passed as a comma-separated string, e.g., "22,12,8,0"
export const getEpisodesByIds = async (ids: string): Promise<Episode[]> => {
  try {
    // Fetching episodes from the API by their IDs
    const response = await axios.get<Episode[] | Episode>(`${URL}/${ids}`);
    const data = response.data;

    if (Array.isArray(data)) {
      // If the response contains multiple episodes
      return data.map((episode) => ({
        id: episode.id,
        name: episode.name,
        air_date: episode.air_date,
        episode: episode.episode,
        characters: episode.characters,
      }));
    } else {
      // If the response contains a single episode
      return [
        {
          id: data.id,
          name: data.name,
          air_date: data.air_date,
          episode: data.episode,
          characters: data.characters,
        },
      ];
    }
  } catch (error) {
    console.log("Error fetching episodes by Ids:", error);
    return [];
  }
};

// Function to fetch episodes based on an array of URLs
export const getEpisodesByUrls = async (urls: string[]): Promise<Episode[]> => {
  try {
    // Extracting episode IDs from the URLs
    let ids = urls.map((url) => {
      let parts = url.split("/");
      const id = parts.pop();

      if (id && !isNaN(Number(id))) {
        return Number(id);
      } else {
        return "";
      }
    });
    // Joining IDs into a comma-separated string
    let strIds = ids ? ids.join() : "";
    // Fetching episodes by their IDs
    const episodes = await getEpisodesByIds(strIds);
    return episodes;
  } catch (error) {
    return [];
  }
};
