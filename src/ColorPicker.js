import React from 'react';
import { ChromePicker } from 'react-color';

class ColorPicker extends React.Component {
    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         background: '#fff'
    //     };
    // }
    //
    // handleChange = (color) => {
    //     this.setState({
    //         background: color.hex
    //     });
    //     // props.setColor;
    // };
    //
    // render() {
    //     return (
    //         <ChromePicker
    //             color = {this.state.background}
    //             onChange = {this.handleChange}
    //         />
    //     );
    // }

    render() {
        return (
            <ChromePicker
                color = {this.props.color}
                onChange = {this.props.onChange}
            />
        );
    }
}

export default ColorPicker;
