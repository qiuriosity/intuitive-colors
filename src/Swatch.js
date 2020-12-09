import React from 'react';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

class Swatch extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        // console.log(this.state.color);
        return (
            <OverlayTrigger
                placement="bottom"
                trigger = {["hover", "focus"]}
                overlay={<Tooltip id="button-tooltip-2">{this.props.color}</Tooltip>}
            >
                {/* displays hex code on hover/focus */}
                <div className="circle-swatch"
                    style={{backgroundColor: this.props.color}}>
                </div>
            </OverlayTrigger>
        );
    }
}

export default Swatch;
