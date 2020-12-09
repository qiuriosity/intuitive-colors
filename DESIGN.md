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

In the earlier stages of this project, I also had to figure out what to make into a separate component vs not. I wanted to make components for anything that had its own distinct functions. For example, each ColorCard has its own handleChange that doesn't require input from the ColorStation, so it made more sense to just separate the component out. Likewise, the ColorStation and FullPalette were separated from the App because 1) it helped reduce clutter and 2) they have their own distinct functions, like generating colors, that don't need to be on a more "global" scale. I also wanted to make a separate component for Swatch, because unlike some of the text or buttons in Swatch's parent components, Swatch is used many times in multiple locations. For each component, I included its relevant functions in the same file, since most components here didn't require a large number of helper functions.

## a rundown of the color-generating algorithm in FullPalette

I like to make digital art for fun, so I developed this algorithm primarily from the knowledge I've accumulated through my experience. I learned a lot of this stuff by watching artists on YouTube or looking at resources made by people on Tumblr, Pinterest, etc. For my project, [this website](https://www.w3schools.com/colors/colors_hsl.asp) helped me a lot with understanding HSL values in particular.

### brief color theory & explanation of shading

* *hue:* essentially the tint of the color itself (eg. red, orange, purple-blue, etc.)
* *saturation:* how faded/strong the color is (0 saturation is gray, full saturation is a really vivid color)
* *value/brightness:* how bright the color is (0 value is black, full value is white)
* *shadows:* darker shades of the base color used to emphasize darker areas of the object
* *highlights:* lighter shades of the base color used to emphasize lighter areas of the object

The way I personally approach shading is using a [color wheel picker](https://i.stack.imgur.com/NYCBt.png), in which you can use one slider to adjust the hue of the color and another to adjust the value/saturation of that specific hue. Since these shifts translate well to changes in HSL value, I decided that any functions manipulating color in some way should work with the HSL values of the colors.

In a typical environment, true shadows have a hue opposite that of the lighting source. For example, in natural yellow-ish lighting, shadows are blue-ish. Thus, when generating darker shades (shadows), we want to shift the hue slightly closer to blue, and vice versa for lighter shades (highlights). This isn't to say that the shadows will have a blue hue itself, but rather that it'll be closer to blue than lighter shades (eg. if the base color is red, a shadow might be pinkish-red, and an even darker shadow might be purple). Not only the hue will change; shadows will also have lower value (be darker in color) and higher saturation (have stronger color).

Note that when you're shifting the hues closer to the true shadow hue (eg. blue), you want to move in the direction that's closer. Going back to the color wheel [here](https://i.stack.imgur.com/NYCBt.png), if your starting color is green, you want to move clockwise towards blue. If you're starting at pink, though, you should move counterclockwise rather than taking the long way.

### some math (I guess)

When I first implemented this algorithm, all the color transformations were linear (increasing the shadow resulted in an x amount of shift in hue, a y amount of change in saturation, and a z amount of change in value). This quickly began to cause issues for a number of reasons:

* For hues, some shades that were already very close to the true shadow hue (eg. blue) would move past it after the transformation. This didn't make sense, because shadows should always be getting closer to the true shadow hue, never to the other side.
* The lighting customization feature didn't cause any changes, which was because shifts in hue were the same regardless of lighting.
* Darker base colors would produce a bunch of shadows that were just completely black, because even though a 10 unit decrease in value works for lighter base shades, it causes darker base shades to reach 0 value. The same was true for very light base colors; the value would simply become 0 and the highlights would be completely white.

Thinking from the perspective of an actual person, if I'm closer to the target value (if my hue is already close to blue, or my saturation is already close to 100, or my value is already close to 0), I would want to shift my values by a smaller amount than if I were farther away. This would allow me to get closer and closer to the target value, but never quite reach it (which makes sense, since we wouldn't want to use true black or white as an actual shade).

The current algorithm takes care of this issue; it calculates the difference between the current hue, saturation, and value and their target values. Then, it shifts the current values by a percentage of the difference. This ensures that colors farther from the target value will show more change, and colors that are already close to the target will show less. I went through and tested this with some different percentages to see what looked best.

### future improvements

In terms of design, a couple of things I'd like to look into for the future:

* Taking away the need for hex/HSL conversions when generating new color values for the shading palette.
* Trying to reduce [prop drilling](https://kentcdodds.com/blog/prop-drilling), which is essentially when you have to pass the same prop or function through many different components in the hierarchy in order for a component on one end to communicate some info to a component on the other end. After completing my project, I've noticed there's some redundancy (ie. ColorStation essentially just passes all the base color values upwards to the App without actually doing much to them) that could potentially be reduced through one of [these](https://medium.com/@jeromefranco/how-to-avoid-prop-drilling-in-react-7e3a9f3c8674) solutions, but I need to spend more time with that to figure it out.
