import * as React from 'react';
import './index.scss';
import { Board } from './board';

export const Game: React.FC<Props> = (props) => {

    return (
        <div className='game-container'>
            <Board start={{ x: 0, y: 7 }} />
        </div>
    );
}

interface Props {

}