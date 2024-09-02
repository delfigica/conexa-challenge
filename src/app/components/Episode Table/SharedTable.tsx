"use client";
import React, { useContext, useEffect, useState } from "react";
import { CharacterContext } from "@/app/context/CharacterContext";

import { getEpisodesByUrls } from "@/services/episodeService";
import { Episode } from "@/types/episodes";

import "./episode-table.css";

type props = {
  lengthCharacterAvaibleToSelect: number; // Number of characters that must be selected to display shared episodes
};

export const SharedTable = ({ lengthCharacterAvaibleToSelect }: props) => {
  // Accessing the CharacterContext to get the selected characters and the function to update them
  const characterContext = useContext(CharacterContext);
  if (!characterContext) {
    throw new Error(
      "CharacterCardContainer must be used within a CharacterSelectProvider"
    );
  }
  const { characterSelect, setCharacterSelect } = characterContext;

  // State to store the list of shared episodes that will be displayed
  const [listEpisodes, setListEpisodes] = useState<Episode[]>([]);

  // Function to fetch episodes based on their URLs
  const getEpisodes = async (espisodesInUrl: string[]): Promise<Episode[]> => {
    const episodes: Episode[] = await getEpisodesByUrls(espisodesInUrl);
    return episodes;
  };

  // Function to filter episodes so that only those shared by all selected characters are shown
  const filterEpisodes = async () => {
    const allEpisodes: Episode[][] = await Promise.all(
      characterSelect.map(async (character) => {
        const url = character.episode ? character.episode : [];
        const episodes = await getEpisodes(url);
        return episodes;
      })
    );

    // Start with the episodes of the first character and filter to keep only those shared by all selected characters
    let sharedEpisodes: Episode[] = allEpisodes[0];

    sharedEpisodes = sharedEpisodes.filter((episode) => {
      return allEpisodes.every((episodes) =>
        episodes.some((ep) => ep.id === episode.id)
      );
    });

    // Update the state with the filtered episodes
    setListEpisodes(sharedEpisodes);
  };

  // Effect to filter episodes when the selected characters or the length of characters to select changes
  useEffect(() => {
    if (characterSelect.length == lengthCharacterAvaibleToSelect) {
      filterEpisodes();
    } else {
      setListEpisodes([]); // Clear the episode list if the selection is incomplete
    }
  }, [characterSelect, lengthCharacterAvaibleToSelect]);
  return (
    <div className="episode-table">
      <h2>Characters - Shared Episodes</h2>
      {/* Message shown if no shared episodes are found for the selected characters */}
      {listEpisodes.length == 0 &&
        characterSelect.length == lengthCharacterAvaibleToSelect && (
          <h4>No shared episodes found</h4>
        )}
      <div className="episode-item-box">
        {/* Map through the list of shared episodes and display them */}
        {listEpisodes?.map((episode) => (
          <p>
            <b>{episode.episode}</b> - {episode.name} ({episode.air_date})
          </p>
        ))}
      </div>
    </div>
  );
};
