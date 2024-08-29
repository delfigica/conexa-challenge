export declare interface Episode {
    id: number,
    name: string,
    air_date: string,
    episode: string,
    characters?: string[]
}

export interface EpisodeApiResponse {
    info: {
        count: number;
        pages: number;
        next: string | null;
        prev: string | null;
      };
      results: Episode[];
}