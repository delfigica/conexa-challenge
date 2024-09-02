"use client";
import React, { useContext, useEffect, useState } from "react";
import { CharacterContext } from "@/app/context/CharacterContext";

import { Episode } from "@/types/episodes";
import { getEpisodesByUrls } from "@/services/episodeService";

import "./episode-table.css";

type props = {
  title: string; // Title for the episode table, displayed at the top
  characterIndex: number; // Index of the character whose episodes will be displayed
  lengthCharacterAvaibleToSelect: number; // Total number of characters that can be selected
};

export const EpisodeTable = ({
  title,
  characterIndex,
  lengthCharacterAvaibleToSelect,
}: props) => {
  // Accessing the CharacterContext to get the selected characters and the function to update them
  const characterContext = useContext(CharacterContext);
  if (!characterContext) {
    throw new Error(
      "CharacterCardContainer must be used within a CharacterSelectProvider"
    );
  }
  const { characterSelect, setCharacterSelect } = characterContext;

  // State to store the list of episodes that will be displayed
  const [listEpisodes, setListEpisodes] = useState<Episode[]>([]);

  // Function to fetch episodes based on their URLs
  const getEpisodes = async (espisodesInUrl: string[]): Promise<Episode[]> => {
    const episodes: Episode[] = await getEpisodesByUrls(espisodesInUrl);
    return episodes;
  };

  // Function to filter episodes so that only those unique to the selected character are shown
  const filterEpisodes = async () => {
    const allEpisodes: Episode[][] = await Promise.all(
      characterSelect.map(async (character) => {
        const url = character.episode ? character.episode : [];
        const episodes = await getEpisodes(url);
        return episodes;
      })
    );

    // Get the episodes for the current character based on their index
    let characterEpisodes: Episode[] = allEpisodes[characterIndex];

    // Filter episodes to exclude those that are shared with other selected characters
    characterEpisodes = characterEpisodes.filter((episode) => {
      return !allEpisodes.some((episodes, index) => {
        return (
          index !== characterIndex &&
          episodes.some((ep) => ep.id === episode.id)
        );
      });
    });

    // Update the state with the filtered episodes
    setListEpisodes(characterEpisodes);
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
      <h2>{title}</h2>

      {/* Message shown if no unshared episodes are found for the selected character */}
      {listEpisodes.length == 0 &&
        characterSelect.length == lengthCharacterAvaibleToSelect && (
          <h4>No unshared episodes found</h4>
        )}

      {/* Message shown if not all characters are selected */}
      {listEpisodes.length == 0 &&
        characterSelect.length !== lengthCharacterAvaibleToSelect && (
          <h4>Choose a character</h4>
        )}
      <div className="episode-item-box">
        {/* Map through the list of episodes and display them */}
        {listEpisodes?.map((episode) => (
          <p>
            <b>{episode.episode}</b> - {episode.name} ({episode.air_date})
          </p>
        ))}
      </div>
    </div>
  );
};
