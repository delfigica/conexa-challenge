import React from "react";
import { render, screen, waitFor, within } from "@testing-library/react";
import { CharacterContext } from "@/app/context/CharacterContext";
import { getEpisodesByUrls } from "@/services/episodeService";
import { Episode } from "@/types/episodes";
import { SharedTable } from "@/app/components/Episode Table/SharedTable";

jest.mock("../../../services/episodeService", () => ({
  getEpisodesByUrls: jest.fn(),
}));

const mockEpisodes: Episode[] = [
  { id: 1, episode: "S01E01", name: "Pilot", air_date: "December 2, 2013" },
  {
    id: 2,
    episode: "S01E02",
    name: "Lawnmower Dog",
    air_date: "December 9, 2013",
  },
];

const mockCharacterContext = {
  characterSelect: [
    { id: 1, name: "Rick Sanchez", episode: ["url1", "url2"] },
    { id: 2, name: "Morty Smith", episode: ["url1"] },
  ],
  setCharacterSelect: jest.fn(),
};

describe("SharedTable", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders without crashing", () => {
    render(
      <CharacterContext.Provider value={mockCharacterContext}>
        <SharedTable lengthCharacterAvaibleToSelect={2} />
      </CharacterContext.Provider>
    );

    expect(
      screen.getByText("Characters - Shared Episodes")
    ).toBeInTheDocument();
  });

  test("shows 'No shared episodes found' when no shared episodes are found", async () => {
    (getEpisodesByUrls as jest.Mock).mockResolvedValueOnce([
      { id: 1, episode: "S01E01", name: "Pilot", air_date: "December 2, 2013" },
    ]);

    render(
      <CharacterContext.Provider
        value={{
          characterSelect: [
            { id: 1, name: "Rick Sanchez", episode: ["url1"] },
            { id: 2, name: "Morty Smith", episode: ["url2"] },
          ],
          setCharacterSelect: jest.fn(),
        }}
      >
        <SharedTable lengthCharacterAvaibleToSelect={2} />
      </CharacterContext.Provider>
    );

    await waitFor(() => {
      expect(screen.getByText("No shared episodes found")).toBeInTheDocument();
    });
  });

  test("fetches and displays shared episodes when characters are selected", async () => {
    (getEpisodesByUrls as jest.Mock).mockResolvedValueOnce(mockEpisodes);
    (getEpisodesByUrls as jest.Mock).mockResolvedValueOnce([
      { id: 1, episode: "S01E01", name: "Pilot", air_date: "December 2, 2013" },
    ]);

    render(
      <CharacterContext.Provider value={mockCharacterContext}>
        <SharedTable lengthCharacterAvaibleToSelect={2} />
      </CharacterContext.Provider>
    );
    await waitFor(() => {
      expect(
        screen.getAllByText(
          (_, element) =>
            element?.textContent === "S01E01 - Pilot (December 2, 2013)"
        )
      );
    });
  });

  test("clears the list of episodes if the selection is incomplete", async () => {
    (getEpisodesByUrls as jest.Mock).mockResolvedValue(mockEpisodes);

    render(
      <CharacterContext.Provider
        value={{
          ...mockCharacterContext,
          characterSelect: [{ id: 1, name: "Rick Sanchez", episode: ["url1"] }],
        }}
      >
        <SharedTable lengthCharacterAvaibleToSelect={2} />
      </CharacterContext.Provider>
    );

    await waitFor(() => {
      expect(
        screen.getByText("Characters - Shared Episodes")
      ).toBeInTheDocument();
    });
  });
});
