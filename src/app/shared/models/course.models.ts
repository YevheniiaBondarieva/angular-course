import { Author } from "./author.models";

export interface Course {
    id: number | string;
    name: string;
    description: string;
    isTopRated: boolean;
    date: string;
    authors: Author[];
    length: number;
}