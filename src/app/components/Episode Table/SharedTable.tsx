"use client";
import React, { useContext, useEffect, useState } from "react";
import { CharacterContext } from "@/app/context/CharacterContext";
import { getEpisodesByUrls } from "@/services/episodeService";
import { Episode } from "@/types/episodes";
import "./episode-table.css";

type props = {
  lengthCharacterAvaibleToSelect: number;
};

export const SharedTable = ({ lengthCharacterAvaibleToSelect }: props) => {
  const characterContext = useContext(CharacterContext);

  if (!characterContext) {
    throw new Error(
      "CharacterCardContainer must be used within a CharacterSelectProvider"
    );
  }
  const { characterSelect, setCharacterSelect } = characterContext;

  const [listEpisodes, setListEpisodes] = useState<Episode[]>([]);

  const getEpisodes = async (espisodesInUrl: string[]): Promise<Episode[]> => {
    const episodes: Episode[] = await getEpisodesByUrls(espisodesInUrl);
    return episodes;
  };

  const filterEpisodes = async () => {
    const allEpisodes: Episode[][] = await Promise.all(
      characterSelect.map(async (character) => {
        const url = character.episode ? character.episode : [];
        const episodes = await getEpisodes(url);
        return episodes;
      })
    );

    let sharedEpisodes: Episode[] = allEpisodes[0];

    sharedEpisodes = sharedEpisodes.filter((episode) => {
      return allEpisodes.every((episodes) =>
        episodes.some((ep) => ep.id === episode.id)
      );
    });

    setListEpisodes(sharedEpisodes);
  };

  useEffect(() => {
    if (characterSelect.length == lengthCharacterAvaibleToSelect) {
      filterEpisodes();
    } else {
      setListEpisodes([]);
    }
  }, [characterSelect, lengthCharacterAvaibleToSelect]);
  return (
    <div className="episode-table">
      <h2>Characters - Shared Episodes</h2>
      {listEpisodes.length == 0 &&
        characterSelect.length == lengthCharacterAvaibleToSelect && (
          <h4>No shared episodes found</h4>
        )}
      <div className="episode-item-box">
        {listEpisodes?.map((episode) => (
          <p>
            <b>{episode.episode}</b> - {episode.name} ({episode.air_date})
          </p>
        ))}
      </div>
    </div>
  );
};
