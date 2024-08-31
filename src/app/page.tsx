import { CharacterCardContainer } from "./components/Character Card Container/CharacterCardContainer";
import { EpisodeTable } from "./components/Episode Table/EpisodeTable";
import { SharedTable } from "./components/Episode Table/SharedTable";
import { CharacterSelectProvider } from "./context/CharacterContext";

import "./page.css";
export default function Home() {
  const quantityCharacterSelect = 2;

  return (
    <CharacterSelectProvider>
      <div className="home">
        <CharacterCardContainer />
        <div className="episode-table-container">
          {Array.from({ length: quantityCharacterSelect }).reduce<
            JSX.Element[]
          >((acc, _, index) => {
            if (index === Math.floor(quantityCharacterSelect / 2)) {
              acc.push(
                <SharedTable
                  key="shared-table"
                  lengthCharacterAvaibleToSelect={quantityCharacterSelect}
                />
              );
            }
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
