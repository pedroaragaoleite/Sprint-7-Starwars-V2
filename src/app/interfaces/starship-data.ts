export interface StarshipData {
    name: string,
    model: string,
    url: string,
    cargo: string,
    consumables: string,
    cost: string,
    crew: string,
    hyperdrive: string,
    length: string,
    manufacturer: string,
    max_speed: string,
    passengers: string,
    films: [],
    pilots: [],
    starship_class: string,
}

export interface StarshipResults {
    count: number,
    next: string,
    previous: null,
    results: StarshipData[]
}

export interface StarshipImage {
    url: string
}