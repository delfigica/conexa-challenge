import Image from "next/image";
import styles from "./page.module.css";
import { CharacterCardContainer } from "./components/Character Card Container/CharacterCardContainer";

export default function Home() {
  return (
    <div>
      <CharacterCardContainer />
    </div>
  );
}
