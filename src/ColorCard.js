import React from 'react';
import Card from 'react-bootstrap/Card';
import ColorPicker from './ColorPicker';

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
    }

    handleChange = (color) => {
        this.setState({
            background: color.hex
        });
        // props.setColor;
    };

    render() {
        return (
            <Card>
                <Card.Header className="squareSwatch">
                    <div style={{backgroundColor: this.state.background, width: '100%', height: 100}}></div>
                </Card.Header>
                <Card.Body>
                    <ColorPicker
                        color = {this.state.background}
                        onChange = {this.handleChange}
                    />
                </Card.Body>
            </Card>
        );
    }
}

export default ColorCard;
