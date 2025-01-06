export interface Question {
    q: string;
    a: string;
    difficulty?: number;
    book?: number;
    duplicate: boolean;
    flag: boolean;
    checked: boolean;
}