export interface Book {
    id: number;
    title: string;
    image: string;
    available: boolean;
    takenBy?: string;
    takenByName?: string;
}
