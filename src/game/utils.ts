import { RawLevel, Level, Tile, RawTile } from './models/level';
import { _mapWidth, _mapHeight } from '../_settings';

export const ImportLevel = (rawLvl: RawLevel) => {
    const level: Tile[][] = [];
    const groundTile = '/sprites/ground.png';
    const wallTile = '/sprites/wall.png';
    const monsterSprites = [
        '/sprites/slime.png'
    ];

    for (let y = 0; y < rawLvl.layout.length; y++) {
        let rawLine = rawLvl.layout[y];
        const line = [];
        for (let x = 0; x < rawLine.length; x++) {
            let tile = {
                contents: []
            } as Tile;

            const rawTile = rawLine[x];

            if (rawTile === RawTile.Wall)
                tile.contents.push({ url: wallTile });
            else {
                tile.contents.push({ url: groundTile });
                const random = Math.floor(Math.random() * monsterSprites.length);
                
                switch (rawTile) {
                    case RawTile.Monster:
                        tile.contents.push({ url: monsterSprites[random] });
                    // TODO: The rest
                }
            }
            line.push(tile);
        }

        level.push(line);
    }

    return {
        defaultSprite: groundTile,
        layout: level
    } as Level;
}

export const RandomLevel = (width: number, height: number) => {
    let level = [];

    for (let y = 0; y < height; y++) {
        let line = [];

        for (let x = 0; x < width; x++) {
            line.push(Math.floor(Math.random() * 3));
        }

        level.push(line);
    }

    return level;
}

export const GetNonsenseLevel = () => {
    let content = RandomLevel(_mapWidth, _mapHeight);
    return ImportLevel({
        layout: content
    });
}
