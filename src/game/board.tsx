import * as React from 'react';
import { RawLevel, Level, Tile, RawTile } from './models/level';

export const Board: React.FC<Props> = (props) => {


    return (
        <canvas>

        </canvas>
    );
}

interface Props {

}

export const ImportLevel = (rawLvl: RawLevel) => {
    const level: Tile[][] = [];
    const groundTile = '';
    const wallTile = '';
    const monsterSprites = [
        '',
        ''
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
        }
    }

    return {
        defaultSprite: groundTile,
        layout: level
    } as Level;
}
