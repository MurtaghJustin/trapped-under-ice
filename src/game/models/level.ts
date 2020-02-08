export interface Level {
    layout: Tile[][];
    defaultSprite: string;
}

export interface Tile {
    contents: Sprite[];
}

export interface Sprite {
    url: string;
}

export interface RawLevel {
    layout: RawTile[][];
}

export enum RawTile {
    Floor = 0,
    Wall = 1,
    Monster = 2,
    Trap = 3,
    Spikes = 4,
    Chest = 5
}
