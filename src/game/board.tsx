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
        window.onkeydown = (e: KeyboardEvent) => {
            const previousDirection = this.facing;
            switch (e.which) {
                // Left
                case 37:
                    this.facing = Direction.West;
                    break;
                // Up
                case 38:
                    this.facing = Direction.North;
                    break;
                // Right
                case 39:
                    this.facing = Direction.East;
                    break;
                // Down
                case 40:
                    this.facing = Direction.South;
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

            if (this.facing === previousDirection)
                this.accelerate();
        }

        window.onkeyup = (e: KeyboardEvent) => {
            switch (e.which) {
                // Left
                case 37:
                // Up
                case 38:
                // Right
                case 39:
                // Down
                case 40:
                    this.decelerate();
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

    decelerate() {
        this.speed--;

        if (this.speed < 0)
            this.speed = 0;
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
            let lines = view.length;
            for (let y = 0; y < lines; y++) {
                let line = view[y];
                let ypos = _tilesize * y;

                for (let x = 0; x < line.length; x++) {
                    let xpos = x * _tilesize;
                    let tile = line[x];

                    if (tile.contents.length > 0) {
                        for (let i = 0; i < tile.contents.length; i++) {
                            //let img = this.props.sprites[tile.contents[i].url];
                            let img = new Image(_tilesize, _tilesize);
                            img.src = tile.contents[i].url;
                            context?.drawImage(img, xpos, ypos, _tilesize, _tilesize);
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
        // TODO: Play the attack animation in the tile next to the character in the direction they are facing
    }

    jump() {
        // TODO: Jump 1.25 tiles (so there's a bit of wiggle room)
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
    sprites: { [url: string]: HTMLImageElement }
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
