# intuitive colors  

A resource for artists and content creators that generates customizable, natural shading palettes from a user-selected set of base colors. This project was originally created as a final project for CS50, but will (hopefully) continue to be updated and optimized in the future.

# about this application

Creating natural-looking palettes for artistic work requires dynamic shading that accounts for environmental light, as well as colors' individual hues in relation to the desired shadow hue. This application allows users to designate a palette of foundational colors that make up the basic aspects of their project (eg. a base skin, hair, or landscape color). Using this base palette, **intuitive colors** creates a larger palette consisting of compatible shades and highlights that can be used along with the foundational colors. Users can customize the size of the generated palette, as well as environmental lighting and dullness.

# configuration & usage

## running the application w/React

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app). Running the downloaded version of this application on a local device requires installation of [Node.js](https://nodejs.org/en/) and [yarn](https://classic.yarnpkg.com/en/docs/install/).

After navigating to the project directory in terminal, execute `yarn start` to start the application and go to [http://localhost:3000](http://localhost:3000). This application also requires the support of package dependencies, which can be obtained by executing `yarn install` in the directory (see package.json for a list of packages). If making any alterations to the application, visit the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started) for more details.

*I don't have yarn:* using `npm start` and `npm install` should also work.

## selecting base palette

You must select colors to add to your base palette before you can generate a new palette. Note that your base palette should only consist of *foundational* colors. For any given object, this is the color that makes up the bulk of the object's appearance. For example: if you wanted to generate shades for an apple, the base shade you should choose should be the color that you would attribute to the apple if you disregarded shading, highlighting, and environmental light.

To select base colors, use the color pickers provided (one per color). The slider on each color picker can also be used to adjust the hue of the color. The default number of base colors is four; in the event that you need more, click the plus sign to include an additional color.

## navigating the fully generated palette

Once you've selected all your base colors, simply click "generate colors" to navigate to your full palette created by **intuitive colors**.

### I like this specific color in the palette. How do I know what color this is?

**intuitive colors** allows users to hover over the swatch of a specific color to view the hex code, which can then be integrated into their artwork or media-related projects. For users on touch-screen devices, simply focus on the swatch by tapping, and the same overlay will appear.

### What if I don't need so many different shades? What if I want to see even more shades?

To increase or decrease the amount of shades and highlights, use the + and - buttons on the right panel of the color palette. A single use of these controls will either add or remove one pair of shades and highlights for each base color. This feature allows users to generate a wider spectrum of shades when their work has a deeper range of light and dark features. Likewise, you can choose to narrow the spectrum when such breadth is not needed.

### I like the general distribution of these shades, but I need something duller/more vibrant across the board.

Using the vibrancy controls (also located on the right panel) will result in saturation and value changes for all colors in the generated palette, creating an overall duller or more saturated and bright appearance.

### The colors generated seem to work well under natural daylight, but I need colors that work with more artifical/unique lighting.

By default, **intuitive colors** generates color palettes compatible with yellow light, which most closely resembles the natural effects of daylight. Thus, the palettes generated will show how your base colors, as well as their shadows and highlights, would look under typical daylight.

Changing the lighting is simple: use the slider on the left panel to adjust the color of the light. Moving downwards on the slider will take you counterclockwise around the color wheel (in the direction of cooler colors, then back to yellow), and vice versa. Note that some lighting effects may produce bizarre-looking color palettes; the base colors will also change according to the lighting, because they will appear different in differently-lit environments.

# credits & implementation details

Color pickers are sourced from [this collection](https://casesandberg.github.io/react-color/). Additionally: some UI features implemented through [React Bootstrap](https://react-bootstrap.github.io/), & hex/HSL conversion functions sourced from [here](https://css-tricks.com/converting-color-spaces-in-javascript/).
