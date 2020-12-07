import React from 'react';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

class Swatch extends React.Component {
    constructor(props) {
        super(props);
        // this.state = {
        //     color: "#ffffff"
        // }
        // this.setColor = this.setColor.bind(this);
    }

    // setColor(hex) {
    //     this.setState({
    //         color: hex
    //     });
    // }
    //
    // componentWillReceiveProps(nextProps) {
    //     this.setColor(nextProps.color);
    // }

    render() {
        // console.log(this.state.color);
        return (
            // <div className="circleSwatch" style={{backgroundColor: this.props.color, width: 50, height: 50}}></div>
            <OverlayTrigger
                placement="bottom"
                trigger = {["hover", "focus"]}
                overlay={<Tooltip id="button-tooltip-2">{this.props.color}</Tooltip>}
            >
                <div className="circleSwatch"
                    style={{backgroundColor: this.props.color}}>
                </div>
            </OverlayTrigger>
        );
    }

    // {({ ref, ...triggerHandler }) => (
    //     <div className="circleSwatch"
    //         {...triggerHandler}
    //         style={{backgroundColor: this.props.color, width: 50, height: 50}}>
    //     </div>
    // )}
}

export default Swatch;
