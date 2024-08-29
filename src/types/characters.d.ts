export declare interface Character {
  id: number;
  name: string;
  status: string;
  image: string;
  species: string;
  episode?: string[];
}

export interface CharacterApiResponse {
  info: {
    count: number;
    pages: number;
    next: string | null;
    prev: string | null;
  };
  results: Character[];
}
