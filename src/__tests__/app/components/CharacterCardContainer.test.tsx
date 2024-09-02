import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { CharacterCardContainer } from "../../../app/components/Character Card Container/CharacterCardContainer";
import { CharacterContext } from "@/app/context/CharacterContext";
import { getCharacterData } from "@/services/characterService";

jest.mock("../../../services/characterService", () => ({
  getCharacterData: jest.fn(),
}));

const mockCharacterData = {
  info: { pages: 3, next: "?page=2", prev: null, count: 40 },
  results: [
    {
      id: 1,
      name: "Rick Sanchez",
      status: "Alive",
      image: "https://rickandmortyapi.com/api/character/avatar/1.jpeg",
      species: "Human",
    },
    {
      id: 2,
      name: "Morty Smith",
      status: "Alive",
      image: "https://rickandmortyapi.com/api/character/avatar/2.jpeg",
      species: "Human",
    },
  ],
};

const mockCharacterContext = {
  characterSelect: [],
  setCharacterSelect: jest.fn(),
};

describe("CharacterCardContainer", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders character data on initial load", async () => {
    (getCharacterData as jest.Mock).mockResolvedValue(mockCharacterData);

    render(
      <CharacterContext.Provider value={mockCharacterContext}>
        <CharacterCardContainer />
      </CharacterContext.Provider>
    );

    await waitFor(() => {
      expect(screen.getByText("Rick Sanchez")).toBeInTheDocument();
      expect(screen.getByText("Morty Smith")).toBeInTheDocument();
    });
  });

  test("handles character selection", async () => {
    (getCharacterData as jest.Mock).mockResolvedValue(mockCharacterData);

    render(
      <CharacterContext.Provider value={mockCharacterContext}>
        <CharacterCardContainer />
      </CharacterContext.Provider>
    );

    await waitFor(() => {
      const rickCard = screen.getByText("Rick Sanchez");
      fireEvent.click(rickCard);
      expect(mockCharacterContext.setCharacterSelect).toHaveBeenCalledWith([
        {
          id: 1,
          name: "Rick Sanchez",
          status: "Alive",
          image: "https://rickandmortyapi.com/api/character/avatar/1.jpeg",
          species: "Human",
        },
      ]);
    });
  });

  test("handles pagination and page changes", async () => {
    (getCharacterData as jest.Mock).mockResolvedValue(mockCharacterData);

    render(
      <CharacterContext.Provider value={mockCharacterContext}>
        <CharacterCardContainer />
      </CharacterContext.Provider>
    );

    await waitFor(() => {
      expect(screen.getByText("next")).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText("next"));

    await waitFor(() => {
      expect(getCharacterData).toHaveBeenCalledWith("2");
    });
  });

  test("displays pagination component when pagination data is available", async () => {
    (getCharacterData as jest.Mock).mockResolvedValue(mockCharacterData);

    render(
      <CharacterContext.Provider value={mockCharacterContext}>
        <CharacterCardContainer />
      </CharacterContext.Provider>
    );

    await waitFor(() => {
      expect(screen.getByText("prev")).toBeInTheDocument();
      expect(screen.getByText("next")).toBeInTheDocument();
    });
  });
});
