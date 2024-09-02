export declare interface Character {
  id: number;
  name: string;
  status?: string;
  image?: string;
  species?: string;
  episode?: string[];
}

export interface CharacterPagination {
  count: number;
  pages: number;
  next: string | null;
  prev: string | null;
}

export interface CharacterApiResponse {
  info: CharacterPagination;
  results: Character[];
}
