import React from 'react';
import Card from 'react-bootstrap/Card';
import { ChromePicker } from 'react-color';

class ColorCard extends React.Component {
    constructor(props) {
        super(props);
        // set background to white
        this.state = {
            background: '#fff'
        };
        this.id = this.props.id;
    }

    // set background to new color
    handleChange = (color) => {
        this.setState({
            background: color.hex
        });
    };

    // update palette in ColorStation
    handleChangeComplete = (color) => {
        this.props.updatePalette(this.id, color.hex);
    }

    render() {
        return (
            // <Card>
            //     <Card.Header className="square-swatch">
            //         <div style={{backgroundColor: this.state.background, width: '100%', height: 100}}></div>
            //     </Card.Header>
            //     <Card.Body>
            //         <ChromePicker
            //             color = {this.state.background}
            //             onChange = {this.handleChange}
            //             onChangeComplete = {this.handleChangeComplete}
            //         />
            //     </Card.Body>
            // </Card>
            <ChromePicker
                color = {this.state.background}
                onChange = {this.handleChange}
                onChangeComplete = {this.handleChangeComplete}
                disableAlpha = {true}
            />
        );
    }
}

export default ColorCard;
