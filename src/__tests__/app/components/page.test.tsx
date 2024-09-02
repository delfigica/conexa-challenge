import { render, screen } from "@testing-library/react";
import Home from "../../../app/page";

jest.mock("./components/Character Card Container/CharacterCardContainer", () => ({
  CharacterCardContainer: () => <div>CharacterCardContainer</div>,
}));

jest.mock("./components/Episode Table/EpisodeTable", () => ({
  EpisodeTable: ({ title }: { title: string }) => <div>{title}</div>,
}));

jest.mock("./components/Episode Table/SharedTable", () => ({
  SharedTable: () => <div>SharedTable</div>,
}));

describe("Home component", () => {
  test("renders CharacterCardContainer and episode tables", () => {
    render(<Home />);

    
    expect(screen.getByText("CharacterCardContainer")).toBeInTheDocument();

    expect(screen.getByText("Character #1 - Only Episodes")).toBeInTheDocument();
    expect(screen.getByText("Character #2 - Only Episodes")).toBeInTheDocument();

    expect(screen.getByText("SharedTable")).toBeInTheDocument();
  });
});
