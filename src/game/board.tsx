import * as React from 'react';
import { GetNonsenseLevel } from './utils';
import { Pos } from './models/position';
import { Level } from './models/level';
import { _tilesize } from '../_settings';
import './board.scss';

export class Board extends React.PureComponent<Props, State> {
    /**
     *
     */
    constructor(props: Props) {
        super(props);
        
        this.state = {
            level: GetNonsenseLevel()
        };

        // Refs
        this.canvasRef = React.createRef();
    }

    render() {
        return (
            <canvas id='board' height={768} width={768} ref={this.canvasRef}></canvas>
        );
    }

    componentDidMount() {
        if (this.canvasRef.current) {
            let context = this.canvasRef.current.getContext('2d');
            if (!context)
                return;

            let lines = this.state.level.layout.length;
            for (let y = 0; y < lines; y++) {
                let line = this.state.level.layout[y];
                let ypos = _tilesize * y;

                for (let x = 0; x < line.length; x++) {
                    let xpos = x * _tilesize;
                    let tile = line[x];

                    if (tile.contents.length > 0) {
                        for (let i = 0; i < tile.contents.length; i++) {
                            let img = new Image(_tilesize, _tilesize);
                            img.src = tile.contents[i].url;
                            img.onload = () => {
                                context?.drawImage(img, xpos, ypos, _tilesize, _tilesize);
                                console.log(img, xpos, ypos);
                            }
                        }
                    }
                    else {
                        let img = new Image(_tilesize, _tilesize);
                        img.src = this.state.level.defaultSprite;
                        context.drawImage(img, xpos, ypos);
                    }
                }
            }
        }
    }

    // refs
    canvasRef: React.RefObject<HTMLCanvasElement>;
}

interface Props {
    start: Pos;
}

interface State {
    level: Level;
}