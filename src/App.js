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
import 'bootstrap/dist/css/bootstrap.min.css';

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
            // <Router>
            //     <div className="App">
            //         <header className="App-header">
            //             <Switch>
            //                 <Route path = "/palette">
            //                     <FullPalette setPalette = {this.setPalette} base = {this.state.palette}/>
            //                 </Route>
            //                 <Route path = "/">
            //                     <ColorStation setPalette = {this.setPalette}/>
            //                 </Route>
            //             </Switch>
            //         </header>
            //     </div>
            // </Router>

            <div className="App">
                <header className="App-header">
                    <FullPalette setPalette = {this.setPalette} base = {this.state.palette}/>
                    <ColorStation setPalette = {this.setPalette}/>
                </header>
            </div>
        );
    }
}

export default App;
