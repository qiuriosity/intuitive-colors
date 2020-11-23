import React from 'react';
import ColorCard from './ColorCard';

class ColorStation extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            numCards: 4,
            colors: {}
        };
        this.setColor = this.setColor.bind(this);
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

    setColor(id, color) {
        this.setState({
            colors: {
                ...this.state.colors,
                [id]: color.hex
            }
        });
        console.log(this.state.colors)
    }

    render() {
        var cards = [];
        for (let i = 0; i < this.state.numCards; i++) {
            cards.push(<ColorCard key = {i} id = {i} setColor = {this.setColor}/>)
        }

        return (
            <div className="colorStation">
                {cards}
            </div>
        );
    }
}

export default ColorStation;
