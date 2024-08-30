import { CharacterCardContainer } from "./components/Character Card Container/CharacterCardContainer";
import { CharacterSelectProvider } from "./context/CharacterContext";

import "./page.module.css";
export default function Home() {
  return (
    <CharacterSelectProvider>
      <CharacterCardContainer />
    </CharacterSelectProvider>
  );
}
