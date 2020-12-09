import React from 'react';
import ColorCard from './ColorCard';
import Swatch from './Swatch';
import Button from 'react-bootstrap/Button';
import { Transition, CSSTransition } from 'react-transition-group';
import { PlusCircle, DashCircle } from 'react-bootstrap-icons';
import { Link } from "react-router-dom";

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
        this.state = {
            colors: colors,
            showPalette: false
        };
        this.updatePalette = this.updatePalette.bind(this);
        this.addCard = this.addCard.bind(this);
        this.removeCard = this.removeCard.bind(this);
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

    addCard() {
        colors[numCards] = "#ffffff";
        numCards++;
        this.setState({
            colors: colors
        });
    }

    removeCard() {
        delete colors[numCards - 1];
        numCards--;
        this.setState({
            colors: colors
        });
    }

    updatePalette(id, hex) {
        // this.setState({
        //     colors: {
        //         ...this.state.colors,
        //         [id]: hex
        //     }
        // });
        colors[id] = hex;
        this.setState({
            colors: colors
        });
        this.props.setPalette(colors);
    }

    toggleDisplay = () => {
        this.setState({
            showPalette: true
        });
    };

    render() {
        var cards = [];
        var swatches = [];
        for (let i = 0; i < numCards; i++) {
            cards.push(<ColorCard key = {i} id = {i} updatePalette = {this.updatePalette}/>)
            swatches.push(<Swatch key = {i} color = {this.state.colors[i]}/>)
        }

        return (
            <div>
                <div>
                    <h2>choose your base palette</h2>
                    <p className="prompt">use the color pickers below to select base colors for your project. (click +/- to change number of colors in the palette.)</p>
                    <CSSTransition
                        classNames = "palette"
                        in = {this.state.showPalette}
                        unmountOnExit
                        appear = {true}
                        timeout = {0}
                    >
                        <div className="palette">{swatches}</div>
                    </CSSTransition>
                </div>
                <div className="color-station" onClick = {this.toggleDisplay}>
                    {cards}
                    <div className = "icon-panel-lg">
                        <button onClick = {this.addCard}><PlusCircle className="icon" color="black"/></button>
                        <button onClick = {this.removeCard}><DashCircle className="icon" color="black"/></button>
                    </div>
                </div>
                <Button className="button" variant="outline-secondary" as={Link} to="/palette">generate colors</Button>
            </div>
        );
    }

    // <CSSTransition
    //     classNames = "ani"
    //     in = {this.state.showPalette}
    //     timeout = {1000}
    //     unmountOnExit
    // >
    //     <div className="palette">{swatches}</div>
    // </CSSTransition>
    // <div className="palette">{swatches}</div>
    // <CSSTransition
    //     classNames = "prompt"
    //     in = {this.state.showPrompt}
    //     timeout = {1000}
    //     unmountOnExit
    //     appear = {true}
    // >
    //     <p className="prompt">use color pickers to select base colors for your project.</p>
    // </CSSTransition>
}

export default ColorStation;
