import * as React from 'react';
import './loadingBoard.scss';

export const LoadingBoard: React.FC = () => {
    return (
        <div className='board-loading'>
            <h1>Loading...</h1>
            <div className='comment'>This is just an example</div>
        </div>
    );
}
