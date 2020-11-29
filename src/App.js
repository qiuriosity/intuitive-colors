import './App.css';
import React from 'react';
import ColorStation from './ColorStation';
import FullPalette from './FullPalette';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            palette: {}
        };
        this.setPalette = this.setPalette.bind(this);
    }

    setPalette(palette) {
        this.setState({
            palette: palette
        });
        console.log(this.state.palette);
    }

    render() {
        return (
          <div className="App">
            <header className="App-header">
              <ColorStation setPalette = {this.setPalette}/>
              <FullPalette setPalette = {this.setPalette} base = {this.state.palette}/>
            </header>
          </div>
        );
    }
}

export default App;
