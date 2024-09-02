import { CharacterCardContainer } from "./components/Character Card Container/CharacterCardContainer";
import { EpisodeTable } from "./components/Episode Table/EpisodeTable";
import { SharedTable } from "./components/Episode Table/SharedTable";
import { CharacterSelectProvider } from "./context/CharacterContext";

import "./page.css";
export default function Home() {
  // Setting the number of character selections (If you need to update it, do it also in CharacterCardContainer Component in selectCharacter function)
  const quantityCharacterSelect = 2;

  return (
    <CharacterSelectProvider>
      <div className="home">
        <CharacterCardContainer />
        <div className="episode-table-container">
          {/* Create an array of episode tables based on the number of character selections */}
          {Array.from({ length: quantityCharacterSelect }).reduce<
            JSX.Element[]
          >((acc, _, index) => {
            // If the current index is the middle of the array, add the shared table component
            if (index === Math.floor(quantityCharacterSelect / 2)) {
              acc.push(
                <SharedTable
                  key="shared-table"
                  lengthCharacterAvaibleToSelect={quantityCharacterSelect}
                />
              );
            }
            // Add an episode table for each character
            acc.push(
              <EpisodeTable
                key={`episode-table-${index}`}
                title={`Character #${index + 1} - Only Episodes`}
                characterIndex={index}
                lengthCharacterAvaibleToSelect={quantityCharacterSelect}
              />
            );

            return acc;
          }, [])}
        </div>
      </div>
    </CharacterSelectProvider>
  );
}
