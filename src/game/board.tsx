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
            
        };

        // Refs
        this.canvasRef = React.createRef();

        // privates
        this.level = GetNonsenseLevel();
    }

    render() {
        return (
            <canvas id='board' height={765} width={765} ref={this.canvasRef}></canvas>
        );
    }

    componentDidMount() {
        this.setupGame();
    }

    setupGame() {
        this.setupInput();
        this.setupBoard();
        this.setupGameLoop();
    }

    setupInput() {
        window.onkeypress = (e: KeyboardEvent) => {
            switch (e.which) {
                // Left
                case 37:
                    break;
                // Up
                case 38:
                    break;
                // Right
                case 39:
                    break;
                // Down
                case 40:
                    break;
            }
        }
    }

    setupBoard() {
        if (this.canvasRef.current) {
            let context = this.canvasRef.current.getContext('2d');
            if (!context)
                return;

            let lines = this.level.layout.length;
            for (let y = 0; y < lines; y++) {
                let line = this.level.layout[y];
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
                            }
                        }
                    }
                    else {
                        let img = new Image(_tilesize, _tilesize);
                        img.src = this.level.defaultSprite;
                        context.drawImage(img, xpos, ypos);
                    }
                }
            }
        }
    }

    setupGameLoop() {

    }

    onFrame() {
        // TODO: everything
    }

    renderBoard() {
        //
    }



    // refs
    canvasRef: React.RefObject<HTMLCanvasElement>;

    // privates
    private level: Level;
}

interface Props {
    start: Pos;
}

interface State {
    
}