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
        this.facing = Direction.East;
        this.speed = 0;
        this.pos = props.start;
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
                    this.facing = Direction.West;
                    this.accelerate();
                    break;
                // Up
                case 38:
                    this.facing = Direction.North;
                    this.accelerate();
                    break;
                // Right
                case 39:
                    this.facing = Direction.East;
                    this.accelerate();
                    break;
                // Down
                case 40:
                    this.facing = Direction.South;
                    this.accelerate();
                    break;
                // Space
                case 32:
                    this.jump();
                    break;
                // Ctrl
                case 17:
                    this.attack();
                    break;
                default:
                    // Ok, then stop
                    break;
            }
        }
    }

    setupBoard() {
        this.renderBoard();
    }

    setupGameLoop() {
        const frameDelay = 1000 / 48;

        this.interval = setInterval(() => {
            this.onFrame();
        });
    }

    onFrame() {
        this.move();
        this.renderBoard();
    }

    accelerate() {
        const max = 4;

        this.speed++;
        if (this.speed > max)
            this.speed = max;
    }

    move() {
        if (this.speed > 0) {
            switch (this.facing) {
                case Direction.North:
                    break;
                case Direction.South:
                    break;
                case Direction.East:
                    break;
                case Direction.West:
                    break;
            }
        }
    }

    renderBoard() {
        if (this.canvasRef.current) {
            let context = this.canvasRef.current.getContext('2d');
            if (!context)
                return;
            let view = this.getView();
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

    getView() {
        // TODO: Make this calculate things and such
        return this.level.layout;
    }

    // Events
    attack() {

    }

    jump() {

    }

    // refs
    canvasRef: React.RefObject<HTMLCanvasElement>;

    // privates
    private level: Level;
    private facing: Direction;
    private speed: number;
    private pos: Pos;
    private interval: number | null = null;
}

interface Props {
    start: Pos;
}

interface State {
    //
}

enum Direction {
    North,
    South,
    East,
    West
}
