import React from 'react';
import Svg, { Rect } from 'react-native-svg';

const DashedSquare = () => {
    return (
        <Svg height="140" width="140" viewBox="0 0 100 100" >
            <Rect
                x="10"
                y="10"
                width="80"
                height="80"
                stroke="black"
                strokeWidth="2"
                fill="none"
                strokeDasharray="5,5"
            />
        </Svg>
    );
}

export default DashedSquare;