import React from 'react';
import Card from 'react-bootstrap/Card';
import { ChromePicker } from 'react-color';

class ColorCard extends React.Component {
    // render() {
    //     return (
    //         <Card>
    //             sjdfaksdjfa;lksdjf
    //             <Card.Body>
    //                 <ColorPicker/>
    //             </Card.Body>
    //         </Card>
    //     );
    // }

    constructor(props) {
        super(props);
        this.state = {
            background: '#fff'
        };
        this.id = this.props.id;
    }

    handleChange = (color) => {
        this.setState({
            background: color.hex
        });
    };

    handleChangeComplete = (color) => {
        this.props.setColor(this.id, color);
    }

    render() {
        return (
            <Card>
                <Card.Header className="squareSwatch">
                    <div style={{backgroundColor: this.state.background, width: '100%', height: 100}}></div>
                </Card.Header>
                <Card.Body>
                    <ChromePicker
                        color = {this.state.background}
                        onChange = {this.handleChange}
                        onChangeComplete = {this.handleChangeComplete}
                    />
                </Card.Body>
            </Card>
        );
    }
}

export default ColorCard;
