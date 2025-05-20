export type  Personaje = {
    id: number;
    name: string;
    species: string;
    image: string;
    gender: string;
    status: string;
    origin: {
        name: string;
    }
    location: {
        name: string
    }
}