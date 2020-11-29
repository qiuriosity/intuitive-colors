import React from 'react';
import Swatch from './Swatch';

const shade = (light) => (light + 180) % 360;

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

    console.log(r, g, b);

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
    let newHSL = {};
    let hue = hsl["h"],
        saturation = hsl["s"],
        value = hsl["l"];

    // magnitude is -1 for highlights, +1 for shadows
    // ADJUSTING HUE
    // THINK ABT NEGATIVE MODULI AND STUFF
    if (hue > lighting) {
        newHSL["h"] = (hue + (10 * magnitude)) % 360;
    } else if (hue < lighting) {
        newHSL["h"] = (hue - (10 * magnitude) + 360) % 360;
    } else {
        newHSL["h"] = hue;
    }

    // ADJUSTING SATURATION AND VALUE
    newHSL["s"] = (saturation + (15 * magnitude)) % 100;
    newHSL["l"] = (value - (15 * magnitude)) % 100;

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

function generateShades(hex, lighting) {
    let hsl = hexToHSL(hex);
    var shades = [];

    for (let i = 0; i < 9; i++) {
        shades.push(computeShade(hsl, lighting, i - 4));
    }

    return shades;
}

class FullPalette extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            lighting: 60,
            base: this.props.base,
            colors: {}
        };
        // console.log(hexToHSL("#865237"));
        console.log(generateShades("#865237", this.state.lighting));
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            base: nextProps.base
        });
        console.log(this.state.base);
    }

    updateLighting(value) {
        this.setState({
            lighting: value
        });
    }

    render() {
        var collection = [];

        for (var key in this.state.base) {
            var shades = generateShades(this.state.base[key], this.state.lighting);
            var swatches = [];

            for (let i = 0; i < shades.length; i++) {
                swatches.push(<Swatch key = {i * (key + 1)} color = {shades[i]}/>);
            }

            collection.push(<div className = "swatchCol">{swatches}</div>);
        }

        return (
            <div className = "swatchRow">
                {collection}
            </div>
        );
    }
}

export default FullPalette;
