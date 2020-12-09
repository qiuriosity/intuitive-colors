import React from 'react';
import ColorCard from './ColorCard';
import Swatch from './Swatch';
import Button from 'react-bootstrap/Button';
import { Transition, CSSTransition } from 'react-transition-group';
import { PlusCircle, DashCircle } from 'react-bootstrap-icons';
import { Link } from "react-router-dom";

// initialize palette w/four colors, default white
var numCards = 4;
var colors = {};
for (let i = 0; i < numCards; i++) {
    colors[i] = "#ffffff";
}

class ColorStation extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            colors: colors, // contains base palette
            showPalette: false // for CSSTransition (controls palette animation)
        };

        this.updatePalette = this.updatePalette.bind(this);
        this.addCard = this.addCard.bind(this);
        this.removeCard = this.removeCard.bind(this);
    }

    // add a ColorCard and update colors dict
    addCard() {
        colors[numCards] = "#ffffff";
        numCards++;
        this.setState({
            colors: colors
        });
    }

    // remove a ColorCard and update colors dict
    removeCard() {
        delete colors[numCards - 1]; // removes ColorCard at end
        numCards--;
        this.setState({
            colors: colors
        });
    }

    /**
    * @desc updates base palette with new color and ColorCar id
    * @param id (int): id of ColorCard containing specific color
    * @param hex (string): hex value of new color
    */
    updatePalette(id, hex) {
        colors[id] = hex;
        this.setState({
            colors: colors
        });
        this.props.setPalette(colors);
    }

    // activates palette animation
    toggleDisplay = () => {
        this.setState({
            showPalette: true
        });
    };

    render() {
        var cards = [];
        var swatches = [];
        // create ColorCards and corresponding swatches
        for (let i = 0; i < numCards; i++) {
            cards.push(<ColorCard key = {i} id = {i} updatePalette = {this.updatePalette}/>)
            swatches.push(<Swatch key = {i} color = {this.state.colors[i]}/>)
        }

        return (
            <div>
                <div>
                    <h2>choose your base palette</h2>
                    <p className="prompt">use the color pickers below to select base colors for your project. (click +/- to change number of colors in the palette.)</p>
                    {/* animating palette entrance */}
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
                {/* UI "station" containing ColorCards and +/- controls */}
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
