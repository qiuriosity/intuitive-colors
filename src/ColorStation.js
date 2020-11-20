import React from 'react';
import ColorCard from './ColorCard';

class ColorStation extends React.Component {
    render() {
        return (
            <div className="colorStation">
                <ColorCard/>
                <ColorCard/>
                <ColorCard/>
            </div>
        );
    }
}

export default ColorStation;
