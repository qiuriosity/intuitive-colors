# project implementation details

**intuitive colors** was implemented primarily in React.js, with React Router DOM handling the ability to switch between different views. Some UI components are sourced from React Bootstrap, as well as other Github-user-created custom component packages (specific credits given in README file, as well as comments in code).

# basic React info

React is a JavaScript library used to generate and render dynamic HTML components that can interact with each other through props (essentially HTML attributes passed from parent components to child components within the parents). For example, if you were to create a component `Parent` that contains a child component `Child`:

    class Parent extends React.Component {
        this.someTrait = something;

        render() {
            return (
                <Child trait = {this.someTrait}/>
            )
        }
    }

In the `Child` component class, you can access the variable `someTrait` in the parent class by calling `this.props.trait`. This can also be done with functions; when calling a function passed through props in the child class (ex. `this.props.someFunction()`), the function itself will be executed in the parent class. The use of props allows components to communicate with each other across a hierarchy.

In React, components can be defined using classes, as shown in the example above, or as functions. Because I'm very new to React, I chose to stick to class components for the purposes of this project.

# project organization/hierarchy

## basic structure

Because **intuitive colors** is a program that requires 1) collection of user input and 2) display/manipulation of user input elsewhere in the application, I've structured the application to have a somewhat "double-ended" flow of information. User control components at the bottom of the hierarchy take in user input and pass this information to high-level components, which then manipulate the information and pass it back down to other low-level child components that display the information.

## component descriptions

### ColorCard

This is a basic user-input component, containing only a single color picker. This color picker is an imported component from React Color Pickers, a custom component package. As users click and drag, `handleChange` will update the color picker itself to display the new color, as well as its hex, HSL, and RGB values. When the user has finished making an update to the color picker, `handleChangeComplete` will update the base palette in the `ColorStation` component with the newly chosen color. I decided to call this function in `handleChangeComplete` instead of simply adding it to `handleChange` to prevent the program from having to update the base palette constantly.

*Why make a separate component called ColorCard when it only has one child (ChromePicker)?* I didn't want to directly include ChromePicker as a child of ColorStation, since each ChromePicker requires its own handleChange functions in order to operate properly. Since the individual color pickers operate separately of each other, it feels better to just separate their functions from the main interface.

### ColorStation

This component essentially contains the entire UI for the base palette selection page. ColorStation consists of a panel of ColorCards used to select the base palette, as well as a panel of swatches displaying the palette colors. Some text and user controls are also displayed here.

ColorStation renders a panel of four ColorCards by default and assigns each card an id. The set of colors represented by the ColorCards is saved as the dictionary `colors`. When the user selects a color on a ColorCard, the ColorCard calls `this.props.updatePalette` and passes in its unique id, as well as the selected color. ColorStation then calls its own `updatePalette` function and updates `colors` to reflect the change. `colors` saves the selected color as a hex value under the ColorCard's id. All colors in `colors` are set to white by default before the user makes any adjustments.

ColorStation then uses the `colors` dictionary to generate a set of swatches. The hex values are passed to the Swatch components through props, and the Swatch component updates its own color to reflect the change.

### App

The highest component is the app itself, which essentially displays and manages the ColorStation and FullPalette components. When the base palette is updated in ColorStation, ColorStation also calls `this.props.setPalette` to pass the base palette to the App itself. The app then passes the base palette back down to the FullPalette component, where it can be used to generate the new palette.

*Note on routing:* here, I wanted to display the color selecting interface and the generated palette separately, so I used React Router to switch between these two pages. The switch is initiated by the "generate colors" button in ColorStation, which redirects the user to "/palette". As seen in the code, only these two specific parts of the interface switch; the navigation bar remains regardless.

### FullPalette

FullPalette contains the newly generated palette, as well as user controls to customize/adjust the palette. This component takes in the value of the base palette through props and uses the `generateShades` function to generate a new set of hex colors. The UI also allows users to increase/decrease the dullness of the palette, which is implemented through the functions `intensify` and `deintensify`. These functions involve changing the dullness of the base palette in the App itself, which then results in FullPalette rerendering to create new shades compatible with the updated base.

### Swatch

Swatch has no functions of its own and simply functions as a way to display a color. ColorStation and FullPalette both display swatches by simply passing in a props called `color`, which the Swatch then sets as its background color.

## design decisions regarding structure, components, etc.

I ultimately decided on this structure for my project because my project relies on ColorStation needing to pass information to its sibling component, FullPalette. In order to do so, I needed to create an information hierarchy that passed color values to their mutual parent, App. As previously described, user input goes from the ColorCards to the ColorStation, then to the App and back down to FullPalette. The color values also flow back down from ColorStation and FullPalette to the Swatches for display purposes.

In the earlier stages of this project, I also had to figure out what to make into a separate component vs not. I wanted to make components for anything that had its own distinct functions. For example, each ColorCard has its own handleChange that doesn't require input from the ColorStation, so it made more sense to just separate the component out. Likewise, the ColorStation and FullPalette were separated from the App because 1) it helped reduce clutter and 2) they have their own distinct functions, like generating colors, that don't need to be on a more "global" scale. I also wanted to make a separate component for Swatch, because unlike some of the text or buttons in Swatch's parent components, Swatch is used many times in multiple locations.

### future improvements
