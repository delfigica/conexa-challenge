import { Character } from "@/types/characters";
import Image from "next/image";
import React from "react";

import "./character-card.css";

type props = {
  character: Character;
  handleSelectCharacter: (character: Character) => void;
  characterSelected: Character[];
};
export const CharacterCard = ({
  character,
  handleSelectCharacter,
  characterSelected,
}: props) => {
  return (
    <div
      data-testid="character-card"
      className={
        characterSelected.includes(character)
          ? "card-character card-selected"
          : "card-character"
      }
      onClick={() => handleSelectCharacter(character)}
    >
      <div className="image-character-box">
        <Image
          src={character.image}
          alt={"Image character of rick and morty: " + character.name}
          width={230}
          height={250}
          className="character-image"
        />
        {characterSelected.includes(character) && (
          <div className="image-filter-selected">
            <p className="number-selected-character">
              {characterSelected.indexOf(character) + 1}
            </p>
          </div>
        )}
      </div>
      <div className="character-text-box">
        <h3>{character.name}</h3>
        <div className="status-text-box">
          <div
            className={"status-character " + "status-" + character.status}
          ></div>
          <p>{character.status}</p>
        </div>
        <p className="character-species-text">{character.species}</p>
      </div>
    </div>
  );
};
