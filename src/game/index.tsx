import * as React from 'react';
import './index.scss';
import { Board } from './board';
import { _tilesize } from '../_settings';
import { LoadingBoard } from './loadingBoard';

export class Game extends React.PureComponent<Props, State>  {
    /**
     *
     */
    constructor(props: Props) {
        super(props);
        
        this.state = {
            spriteUrls: [
                '/sprites/ground.png',
                '/sprites/wall.png',
                '/sprites/monsters/slime.png',
                '/sprites/unidab.png'
            ],
            loaded: 0
        }
    }

    render () {
        return (
            <div className='game-container'>
                {(this.state.loaded >= this.state.spriteUrls.length && false) ?
                    <Board start={{ x: 9, y: 9 }} sprites={{}} /> :
                    <LoadingBoard />
                }
            </div>
        );
    }

    componentDidMount() {
        this.state.spriteUrls.forEach((u) => {
            let img = new Image(_tilesize, _tilesize);
            img.src = u;
            img.onload = () => {
                this.setState({ loaded: this.state.loaded + 1 });
            };
        })
    }
}

interface Props {

}

interface State {
    spriteUrls: string[];
    loaded: number;
}
