import * as React from 'react';
import './index.scss';
import { Board } from './board';

export const Game: React.FC<Props> = (props) => {

    return (
        <div className='game-container'>
            <Board />
        </div>
    );
}

interface Props {

}