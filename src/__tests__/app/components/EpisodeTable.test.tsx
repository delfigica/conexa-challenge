import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { EpisodeTable } from "../../../app/components/Episode Table/EpisodeTable";
import { CharacterContext } from "@/app/context/CharacterContext";
import { getEpisodesByUrls } from "@/services/episodeService";

jest.mock("../../../services/episodeService", () => ({
  getEpisodesByUrls: jest.fn(),
}));

const mockCharacterContext = {
  characterSelect: [
    { id: 1, name: "Rick Sanchez", episode: ["url1", "url2"] },
    { id: 2, name: "Morty Smith", episode: ["url1", "url3"] },
  ],
  setCharacterSelect: jest.fn(),
};

describe("EpisodeTable", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders without crashing", () => {
    render(
      <CharacterContext.Provider value={mockCharacterContext}>
        <EpisodeTable
          title="Character Episodes"
          characterIndex={0}
          lengthCharacterAvaibleToSelect={2}
        />
      </CharacterContext.Provider>
    );

    expect(screen.getByText("Character Episodes")).toBeInTheDocument();
  });

  test("shows 'Choose a character' when not all characters are selected", () => {
    render(
      <CharacterContext.Provider
        value={{ ...mockCharacterContext, characterSelect: [] }}
      >
        <EpisodeTable
          title="Character Episodes"
          characterIndex={0}
          lengthCharacterAvaibleToSelect={2}
        />
      </CharacterContext.Provider>
    );

    expect(screen.getByText("Choose a character")).toBeInTheDocument();
  });

  test("shows 'No unshared episodes found' when no unique episodes are available", async () => {
    (getEpisodesByUrls as jest.Mock).mockResolvedValueOnce([
      { id: 1, episode: "S01E01", name: "Pilot", air_date: "December 2, 2013" },
    ]);

    render(
      <CharacterContext.Provider
        value={{
          characterSelect: [
            { id: 1, name: "Rick Sanchez", episode: ["url1"] },
            { id: 2, name: "Morty Smith", episode: ["url1"] },
          ],
          setCharacterSelect: jest.fn(),
        }}
      >
        <EpisodeTable
          title="Character Episodes"
          characterIndex={0}
          lengthCharacterAvaibleToSelect={2}
        />
      </CharacterContext.Provider>
    );

    await waitFor(() => {
      expect(
        screen.getByText("No unshared episodes found")
      ).toBeInTheDocument();
    });
  });
});
