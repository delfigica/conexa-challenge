import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";

import { Character } from "@/types/characters";
import { CharacterCard } from "@/app/components/Character Card/CharacterCard";

const mockCharacter: Character = {
  id: 1,
  name: "Rick Sanchez",
  status: "Alive",
  species: "Human",
  image: "/path-image.jpg",
};

const mockHandleSelectCharacter = jest.fn();

describe("CharacterCard", () => {
  test("renders character name and image", () => {
    render(
      <CharacterCard
        character={mockCharacter}
        handleSelectCharacter={mockHandleSelectCharacter}
        characterSelected={[]}
      />
    );

    expect(screen.getByText(/Rick Sanchez/i)).toBeInTheDocument();
    expect(
      screen.getByAltText(/Image character of rick and morty: Rick Sanchez/i)
    ).toBeInTheDocument();
  });

  test("calls handleSelectCharacter when clicked", () => {
    render(
      <CharacterCard
        character={mockCharacter}
        handleSelectCharacter={mockHandleSelectCharacter}
        characterSelected={[]}
      />
    );

    fireEvent.click(screen.getByRole("img"));

    expect(mockHandleSelectCharacter).toHaveBeenCalledWith(mockCharacter);
  });

  test("shows selected state when character is selected", () => {
    render(
      <CharacterCard
        character={mockCharacter}
        handleSelectCharacter={mockHandleSelectCharacter}
        characterSelected={[mockCharacter]}
      />
    );

    expect(screen.getByTestId("character-card").closest("div")).toHaveClass(
      "card-selected"
    );
  });
});
