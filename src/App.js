import './App.css';
import React from 'react';
import ColorStation from './ColorStation';
import FullPalette from './FullPalette';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import {
    HashRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

class App extends React.Component {
    constructor(props) {
        super(props);

        /* using localStorage to save palette so it doesn't get reset between route views
        https://www.joshwcomeau.com/react/persisting-react-state-in-localstorage/
        https://stackoverflow.com/questions/28314368/how-to-maintain-state-after-a-page-refresh-in-react-js */
        this.prevPalette = JSON.parse(localStorage.getItem("palette"));
        // check if previous palette state exists
        if (this.prevPalette !== null) {
            this.state = {
                palette: this.prevPalette
            };
        } else {
            this.state = {
                palette: {}
            };
        }

        this.setPalette = this.setPalette.bind(this);
    }

    // update palette with new palette values
    setPalette(palette) {
        this.setState({
            palette: palette
        }, () => {
            localStorage.setItem("palette", JSON.stringify(this.state.palette))
        });
        console.log(this.state.palette);
    }

    render() {
        // console.log(this.state.palette);
        return (
            <div className="App">
                <div className="App-body">
                    <Router basename="/">
                        {/* navigation bar */}
                        <Navbar className="Navbar" bg="#fbfbf8" fixed="top">
                            <Navbar.Brand as={Link} to="/">intuitive colors</Navbar.Brand>
                            <Nav className="mr-auto">
                                <Nav.Link as={Link} to="/">home</Nav.Link>
                                <Nav.Link href="https://github.com/qiuriosity/intuitive-colors">documentation</Nav.Link>
                            </Nav>
                            <Navbar.Text>
                                <a href="https://github.com/qiuriosity">&#169; eq</a> on github 2020.
                            </Navbar.Text>
                        </Navbar>
                        {/* routing for ColorStation/FullPalette */}
                        <Switch>
                            <Route path = "/palette">
                                <FullPalette setPalette = {this.setPalette} base = {this.state.palette}/>
                            </Route>
                            <Route path = "/">
                                <ColorStation setPalette = {this.setPalette}/>
                            </Route>
                        </Switch>
                    </Router>
                </div>
            </div>
        );
    }
}

export default App;
