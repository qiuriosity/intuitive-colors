import React from 'react';
import Swatch from './Swatch';
import Form from 'react-bootstrap/Form';
import { Plus, Dash, BrightnessHigh, BrightnessLow } from 'react-bootstrap-icons';

// https://stackoverflow.com/questions/4467539/javascript-modulo-gives-a-negative-result-for-negative-numbers
const modCalc = (a, b) => ((a % b) + b) % b;

// calculates true shadow hue given lighting hue
const shade = (light) => modCalc(light + 180, 360);

/* converts hex to HSL
https://css-tricks.com/converting-color-spaces-in-javascript/ */
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

/* converts HSL to hex
https://css-tricks.com/converting-color-spaces-in-javascript/ */
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

/**
* @desc calculates one new shade (either shadow or highlight) for base color
* @param hsl (dict): HSL values for base shade
* @param lighting (int): hue value for the lighting color
* @param magnitude (int): number of shades away from base (negative for highlights, positive for shades)
* magnitude of 1 = one shade away from base color; -2 = two highlights away from base color, etc.
* @return (string) hex value of computed shade
*/
function computeShade(hsl, lighting, magnitude) {
    // console.log(hsl);
    let newHSL = {};
    let hue = hsl["h"],
        saturation = hsl["s"],
        value = hsl["l"];

    // position of hue relative to lighting shade
    let huePosition = modCalc(hue - lighting, 360);
    // distance between hue and true shadow hue
    let shadeDiff = modCalc(hue - shade(lighting), 360);

    // depending on huePosition, move in direction closer to true shadow (for shades) or farther (for highlights)
    if (huePosition > 180) {
        newHSL["h"] = modCalc(shade(lighting) + ((0.92 ** magnitude) * shadeDiff), 360);
    } else if (huePosition < 180 && huePosition > 0) {
        newHSL["h"] = modCalc(shade(lighting) - ((0.92 ** magnitude) * shadeDiff), 360);
    } else {
        newHSL["h"] = hue;
    }

    // if calculating shadows (not highlights), use 100 as target value for saturation and 0 as target for value
    if (magnitude >= 0) {
        let satDiff = 100 - saturation;
        let valDiff = value;
        newHSL["s"] = 100 - ((0.85 ** magnitude) * satDiff);
        newHSL["l"] = (0.72 ** magnitude) * valDiff;
    } else { // for calculating highlights, use 0 as target value for saturation and 100 as target for value
        let satDiff = saturation;
        let valDiff = 100 - value;
        newHSL["s"] = (0.75 ** (-1 * magnitude)) * satDiff;
        newHSL["l"] = 100 - ((0.80 ** (-1 * magnitude)) * valDiff);
    }

    // console.log(newHSL);
    return HSLToHex(newHSL["h"], newHSL["s"], newHSL["l"]);
}

/**
* @desc generate complete spectrum of shades for base color
* @param hex (string): hex code for base color
* @param lighting (int): hue value for the lighting color
* @param numShades (int): number of shades to generate
* @return (list) generated shades
*/
function generateShades(hex, lighting, numShades) {
    // convert to HSL
    let hsl = hexToHSL(hex);
    var shades = [];

    // generate numShades shades, with equal amount of highlights and shadows
    for (let i = 0; i < numShades; i++) {
        shades.push(computeShade(hsl, lighting, i - (Math.floor(numShades / 2))));
    }

    return shades;
}

/**
* @desc change intensity of a color
* @param hsl (dict): HSL values for color
* @param factor (int): 1 to increase intensity, -1 to decrease intensity
* @return (string) hex value of new color
*/
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

/**
* @desc change intensity of entire palette
* @param palette (dict)
* @param factor (int): 1 to increase intensity, -1 to decrease intensity
* @return (dict) new palette with changed intensity
*/
function intensifyPalette(palette, factor) {
    let newPalette = {};

    for (var key in palette) {
        let hsl = hexToHSL(palette[key]);
        // change intensity of individual color in palette and add to new palette
        newPalette[key] = intensifyColor(hsl, factor);
    }

    return newPalette;
}

class FullPalette extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            lighting: 60,
            numShades: 9
        };
    }

    // componentDidMount() {
    //     console.log(this.props.base);
    // }

    // update new lighting values
    updateLighting(value) {
        this.setState({
            lighting: value
        });
    }

    // increase number of shades calculated (+1 highlight and shadow)
    addShades = () => {
        this.setState(prevState => ({
            numShades: prevState.numShades + 2
        }))
    };

    // decrease number of shades calculated (-1 highlight and shadow)
    removeShades = () => {
        this.setState(prevState => ({
            numShades: prevState.numShades - 2
        }))
    };

    // intensify base palette (will change entire generated palette)
    intensify = () => {
        this.props.setPalette(intensifyPalette(this.props.base, 1));
    }

    // deintensify pase palette
    deintensify = () => {
        this.props.setPalette(intensifyPalette(this.props.base, -1));
    }

    // allows lighting slider to change lighting value
    handleChange = e => {
        this.setState({
            lighting: e.target.value
        });
    };

    render() {
        var collection = [];

        for (var key in this.props.base) {
            // generate shades from base palette passed through props
            var shades = generateShades(this.props.base[key], this.state.lighting, this.state.numShades);
            var swatches = [];
            // console.log(shades);

            // create swatches for single base color
            for (let i = 0; i < shades.length; i++) {
                swatches.push(<Swatch key = {i + (key * this.state.numShades)} color = {shades[i]}/>);
            }

            // push swatches to whole palette
            collection.push(<div className = "swatch-col">{swatches}</div>);
        }

        return (
            <div id = "palette-station">
                {/* left side panel */}
                <div className = "control-panel textbox-r">
                    <div>
                        <p><i>welcome to intuitive colors.</i></p>
                        <p>using a user-inputted base palette, intuitive colors generates a set of compatible shades and highlights by manipulating hsl values according to an algorithm.</p>
                        <p>want to use a specific color value in your project? hover over the swatch (or tap on touch screen) to see the hex code. to expand or shrink the palette, use the plus/minus controls (right).</p>
                    </div>
                    {/* slider to adjust lighting */}
                    <Form>
                        <Form.Group controlId="formBasicRangeCustom">
                            <Form.Control type="range" custom
                                className = "lighting-slider"
                                min = "60" max = "420"
                                value = {this.state.lighting}
                                onChange = {this.handleChange}
                                step = "1"
                            />
                        </Form.Group>
                    </Form>
                </div>
                {/* swatches for generated palette */}
                <div className = "swatch-collection">
                    {collection}
                </div>
                {/* right side panel */}
                <div className = "control-panel textbox-l">
                    {/* user controls */}
                    <div className = "icon-panel">
                        <button onClick = {this.addShades}><Plus className="icon" color="black"/></button>
                        <button onClick = {this.removeShades}><Dash className="icon" color="black"/></button>
                        <button onClick = {this.intensify}><BrightnessHigh className="icon" color="black"/></button>
                        <button onClick = {this.deintensify}><BrightnessLow className="icon" color="black"/></button>
                    </div>
                    <div>
                        <p>by default, intuitive colors generates colors based on a yellow lighting hue emulating that of natural light. for projects requiring more unique lighting or duller/more vibrant palettes, using the lighting slider (located on the left panel) and vibrancy controls (right panel) will update the swatches to reflect your preferences.</p>
                        <p>it is recommended to use the default lighting settings for projects involving standard shading and highlighting.</p>
                    </div>
                </div>
            </div>
        );
    }
}

export default FullPalette;
