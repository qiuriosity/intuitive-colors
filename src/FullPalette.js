import React from 'react';
import Swatch from './Swatch';
import Form from 'react-bootstrap/Form';
import { Plus, Dash, BrightnessHigh, BrightnessLow } from 'react-bootstrap-icons';

// const shade = (light) => (light + 180) % 360;
const modCalc = (a, b) => ((a % b) + b) % b;
const shade = (light) => modCalc(light + 180, 360);

// https://css-tricks.com/converting-color-spaces-in-javascript/
function hexToHSL(H) {
    // Convert hex to RGB first
    let r = 0, g = 0, b = 0;
    if (H.length === 4) {
        r = "0x" + H[1] + H[1];
        g = "0x" + H[2] + H[2];
        b = "0x" + H[3] + H[3];
    } else if (H.length === 7) {
        r = "0x" + H[1] + H[2];
        g = "0x" + H[3] + H[4];
        b = "0x" + H[5] + H[6];
    }

    // Then to HSL
    r /= 255;
    g /= 255;
    b /= 255;
    let cmin = Math.min(r,g,b),
        cmax = Math.max(r,g,b),
        delta = cmax - cmin,
        h = 0,
        s = 0,
        l = 0;

    if (delta === 0)
        h = 0;
    else if (cmax === r)
        h = ((g - b) / delta) % 6;
    else if (cmax === g)
        h = (b - r) / delta + 2;
    else
        h = (r - g) / delta + 4;

    h = Math.round(h * 60);

    if (h < 0)
        h += 360;

    l = (cmax + cmin) / 2;
    s = delta === 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));
    s = +(s * 100).toFixed(1);
    l = +(l * 100).toFixed(1);

    var hsl = {
        h: h,
        s: s,
        l: l
    };

    return hsl;
}

function HSLToHex(h,s,l) {
    s /= 100;
    l /= 100;

    let c = (1 - Math.abs(2 * l - 1)) * s,
        x = c * (1 - Math.abs((h / 60) % 2 - 1)),
        m = l - c/2,
        r = 0,
        g = 0,
        b = 0;

    if (0 <= h && h < 60) {
        r = c; g = x; b = 0;
    } else if (60 <= h && h < 120) {
        r = x; g = c; b = 0;
    } else if (120 <= h && h < 180) {
        r = 0; g = c; b = x;
    } else if (180 <= h && h < 240) {
        r = 0; g = x; b = c;
    } else if (240 <= h && h < 300) {
        r = x; g = 0; b = c;
    } else if (300 <= h && h < 360) {
        r = c; g = 0; b = x;
    }
    // Having obtained RGB, convert channels to hex
    r = Math.round((r + m) * 255).toString(16);
    g = Math.round((g + m) * 255).toString(16);
    b = Math.round((b + m) * 255).toString(16);

    // Prepend 0s, if necessary
    if (r.length === 1)
        r = "0" + r;
    if (g.length === 1)
        g = "0" + g;
    if (b.length === 1)
        b = "0" + b;

    return "#" + r + g + b;
}

function computeShade(hsl, lighting, magnitude) {
    // console.log(hsl);
    let newHSL = {};
    let hue = hsl["h"],
        saturation = hsl["s"],
        value = hsl["l"];

    // magnitude is -1 for highlights, +1 for shadows
    // ADJUSTING HUE
    // THINK ABT NEGATIVE MODULI AND STUFF
    // if (hue > lighting) {
    //     newHSL["h"] = (hue + (10 * magnitude) + 360) % 360;
    // } else if (hue < lighting) {
    //     newHSL["h"] = (hue - (10 * magnitude) + 360) % 360;
    // } else {
    //     newHSL["h"] = hue;
    // }

    // console.log(hue, lighting);
    // if (hue > lighting) {
    //     newHSL["h"] = (hue + (6 * magnitude) + 360) % 360;
    // } else if (hue < lighting) {
    //     newHSL["h"] = (hue - (6 * magnitude) + 360) % 360;
    // } else {
    //     newHSL["h"] = hue;
    // }

    let huePosition = modCalc(hue - lighting, 360);
    let shadeDiff = modCalc(hue - shade(lighting), 360);
    if (huePosition > 180) {
        newHSL["h"] = modCalc(shade(lighting) + ((0.93 ** magnitude) * shadeDiff), 360);
    } else if (huePosition < 180 && huePosition > 0) {
        newHSL["h"] = modCalc(shade(lighting) - ((0.93 ** magnitude) * shadeDiff), 360);
    } else {
        newHSL["h"] = hue;
    }

    // ADJUSTING SATURATION AND VALUE
    // newHSL["s"] = saturation + (15 * magnitude);
    // newHSL["l"] = value - (15 * magnitude);
    newHSL["s"] = saturation + (9 * magnitude);
    newHSL["l"] = value - (9 * magnitude);

    if (newHSL["s"] > 100) {
        newHSL["s"] = 100;
    } else if (newHSL["s"] < 0) {
        newHSL["s"] = 0;
    }

    if (newHSL["l"] > 100) {
        newHSL["l"] = 100;
    } else if (newHSL["l"] < 0) {
        newHSL["l"] = 0;
    }

    // console.log(newHSL);
    return HSLToHex(newHSL["h"], newHSL["s"], newHSL["l"]);
}

function generateShades(hex, lighting, numShades) {
    let hsl = hexToHSL(hex);
    var shades = [];

    for (let i = 0; i < numShades; i++) {
        shades.push(computeShade(hsl, lighting, i - (Math.floor(numShades / 2))));
    }

    return shades;
}

function intensifyColor(hsl, factor) {
    let newHSL = {};
    let hue = hsl["h"],
        saturation = hsl["s"],
        value = hsl["l"];

    newHSL["h"] = hue;
    newHSL["s"] = saturation + (10 * factor);
    newHSL["l"] = value + (5 * factor);

    if (newHSL["s"] > 100) {
        newHSL["s"] = 100;
    } else if (newHSL["s"] < 0) {
        newHSL["s"] = 0;
    }

    if (newHSL["l"] > 100) {
        newHSL["l"] = 100;
    } else if (newHSL["l"] < 0) {
        newHSL["l"] = 0;
    }

    return HSLToHex(newHSL["h"], newHSL["s"], newHSL["l"]);
}

function intensifyPalette(palette, factor) {
    let newPalette = {};

    for (var key in palette) {
        let hsl = hexToHSL(palette[key]);
        newPalette[key] = intensifyColor(hsl, factor);
    }

    return newPalette;
}

class FullPalette extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            lighting: 60,
            // base: this.props.base,
            // colors: {},
            numShades: 9
        };
    }

    // componentWillReceiveProps(nextProps) {
    //     this.setState({
    //         base: nextProps.base
    //     });
    //     // console.log(this.state.base);
    // }

    componentDidMount() {
        console.log(this.props.base);
    }

    updateLighting(value) {
        this.setState({
            lighting: value
        });
    }

    addShades = () => {
        this.setState(prevState => ({
            numShades: prevState.numShades + 2
        }))
    };

    removeShades = () => {
        this.setState(prevState => ({
            numShades: prevState.numShades - 2
        }))
    };

    intensify = () => {
        this.props.setPalette(intensifyPalette(this.props.base, 1));
    }

    deintensify = () => {
        this.props.setPalette(intensifyPalette(this.props.base, -1));
    }

    handleChange = e => {
        this.setState({
            lighting: e.target.value
        });
    };

    render() {
        var collection = [];

        for (var key in this.props.base) {
            var shades = generateShades(this.props.base[key], this.state.lighting, this.state.numShades);
            var swatches = [];
            // console.log(shades);

            for (let i = 0; i < shades.length; i++) {
                swatches.push(<Swatch key = {i + (key * this.state.numShades)} color = {shades[i]}/>);
            }

            collection.push(<div className = "swatchCol">{swatches}</div>);
        }

        return (
            <div id = "paletteStation">
                <div className = "sliderWidget rightText">
                    <div>
                        <p><i>welcome to intuitive colors.</i></p>
                        <p>using a user-inputted base palette, intuitive colors generates a set of compatible shades and highlights by manipulating hsl values according to an algorithm.</p>
                        <p>want to use a specific color value in your project? hover over the swatch (or tap on touch screen) to see the hex code. to expand or shrink the palette, use the plus/minus controls (right).</p>
                    </div>
                    <Form>
                        <Form.Group controlId="formBasicRangeCustom">
                            <Form.Control type="range" custom
                                className = "lightingSlider"
                                min = "60" max = "420"
                                value = {this.state.lighting}
                                onChange = {this.handleChange}
                                step = "1"
                            />
                        </Form.Group>
                    </Form>
                </div>
                <div className = "swatchCollection">
                    {collection}
                </div>
                <div className = "sliderWidget leftText">
                    <div className = "iconPanel">
                        <button onClick = {this.addShades}><Plus className="icon" color="black"/></button>
                        <button onClick = {this.removeShades}><Dash className="icon" color="black"/></button>
                        <button onClick = {this.intensify}><BrightnessHigh className="icon" color="black"/></button>
                        <button onClick = {this.deintensify}><BrightnessLow className="icon" color="black"/></button>
                    </div>
                    <div>
                        <p>by default, intuitive colors generates colors based on a yellow lighting hue emulating that of natural light. for projects requiring more unique lighting or duller/more vibrant palettes, using the lighting slider and vibrancy controls will update the swatches to reflect your preferences. (mouse over a specific control to see a description of its function.)</p>
                        <p>it is recommended to use the default lighting settings for projects involving standard shading and highlighting.</p>
                    </div>
                </div>
            </div>
        );
    }

    // <input
    //     id = "lightingSlider"
    //     type = "range"
    //     min = "0" max = "360"
    //     value = {this.state.lighting}
    //     onChange = {this.handleChange}
    //     step = "1"
    // />
}

export default FullPalette;
