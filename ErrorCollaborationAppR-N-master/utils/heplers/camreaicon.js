import * as React from 'react';
import Svg, { Path, Rect } from 'react-native-svg';

const CameraDashedSquareIcon = (props) => {
    return (
        <Svg
            width="100"
            height="100"
            viewBox="0 0 48 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            {/* Dashed Square */}
            <Rect
                x="8"
                y="8"
                width="32"
                height="32"
                fill="none"
                stroke="#000"
                strokeWidth="2"
                strokeDasharray="4 2"
            />
            {/* Camera Icon */}
            <Path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M24 18a6 6 0 100 12 6 6 0 000-12zm0 2a4 4 0 100 8 4 4 0 000-8zm-2-7a2 2 0 012-2h4a2 2 0 012 2v1h3.917a1 1 0 01.993.883l.83 10H14.26l.83-10A1 1 0 0116.083 12H20v-1zm-4 4h12v11a1 1 0 01-1 1H19a1 1 0 01-1-1v-8a1 1 0 00-1-1h-2v5a1 1 0 01-1 1h-1V16z"
                fill="#000"
            />
        </Svg>
    );
};

export default CameraDashedSquareIcon;