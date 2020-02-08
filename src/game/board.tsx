import * as React from 'react';
import { GetNonsenseLevel } from './utils';
import { Pos } from './models/position';

export const Board: React.FC<Props> = (props) => {
    let level = GetNonsenseLevel();
    let [position, setPosition] = React.useState(props.start);


    return (
        <canvas>
            
        </canvas>
    );
}

interface Props {
    start: Pos;
}
