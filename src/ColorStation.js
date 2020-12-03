import React from 'react';
import ColorCard from './ColorCard';
import Swatch from './Swatch';
import Button from 'react-bootstrap/Button';

var numCards = 4;
var colors = {};
for (let i = 0; i < numCards; i++) {
    colors[i] = "#ffffff";
}

class ColorStation extends React.Component {
    constructor(props) {
        super(props);
        // this.state = {
        //     numCards: 4,
        //     colors: {}
        // };
        this.updatePalette = this.updatePalette.bind(this);
    }

    // componentDidMount() {
    //     this.cards = [];
    //     for (this.i = 0; i < this.state.numCards; i++) {
    //         this.cards.push(<ColorCard key={i}/>)
    //     }
    //     this.setState({
    //         cards: this.cards
    //     })
    // }

    // var cards = [];
    // for (let i = 0; i < this.state.numCards; i++) {
    //     cards.push(<ColorCard key = {i}/>);
    // }
    //
    // addCard = () => {
    //     this.setState({
    //         numCards: this.state.numCards + 1
    //     });
    //     cards.push(<ColorCard key = {this.state.numCards}>);
    // };
    //
    // removeCard = (id) => {
    //     cards.splice(0, id);
    //     for (let i = id; i < cards.length; i++) {
    //         cards[i].key--;
    //     }
    // }

    updatePalette(id, hex) {
        // this.setState({
        //     colors: {
        //         ...this.state.colors,
        //         [id]: hex
        //     }
        // });
        colors[id] = hex;
        this.props.setPalette(colors);
    }

    render() {
        var cards = [];
        var swatches = [];
        for (let i = 0; i < numCards; i++) {
            cards.push(<ColorCard key = {i} id = {i} updatePalette = {this.updatePalette}/>)
            swatches.push(<Swatch key = {i} color = {colors[i]}/>)
        }

        return (
            <div>
                <div className="palette">{swatches}</div>
                <div className="colorStation">
                    {cards}
                </div>
                <Button href="/palette" variant="outline-secondary">generate colors</Button>
            </div>
        );
    }
}

export default ColorStation;
