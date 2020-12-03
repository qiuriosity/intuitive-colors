import React from 'react';

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
            <div className="circleSwatch" style={{backgroundColor: this.props.color, width: 50, height: 50}}></div>
        );
    }
}

export default Swatch;
