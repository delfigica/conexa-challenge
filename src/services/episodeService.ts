import axios from "axios";

const URL = "https://rickandmortyapi.com/api/episode";

import { Episode, EpisodeApiResponse } from "@/types/episodes";

export const getAllEpisodes = async (): Promise<Episode[]> => {
  try {
    const response = await axios.get<EpisodeApiResponse>(URL);

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

// You need pass the IDS like string. Ej "22, 12, 8, 0"
export const getEpisodesByIds = async (ids: string): Promise<Episode[]> => {
  try {
    const response = await axios.get<Episode[] | Episode>(`${URL}/${ids}`);
    const data = response.data;

    if (Array.isArray(data)) {
      // If the response have many episodes
      return data.map((episode) => ({
        id: episode.id,
        name: episode.name,
        air_date: episode.air_date,
        episode: episode.episode,
        characters: episode.characters,
      }));
    } else {
      // If the response is an episode
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

export const getEpisodesByUrls = async (urls: string[]): Promise<Episode[]> => {
  try {
    let ids = urls.map((url) => {
      let parts = url.split("/");
      const id = parts.pop();

      if (id && !isNaN(Number(id))) {
        return Number(id);
      } else {
        return "";
      }
    });
    let strIds = ids ? ids.join() : "";
    const episodes = await getEpisodesByIds(strIds);
    return episodes;
  } catch (error) {
    return [];
  }
};
