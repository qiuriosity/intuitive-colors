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

        this.prevPalette = JSON.parse(localStorage.getItem("palette"));
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

    setPalette(palette) {
        this.setState({
            palette: palette
        }, () => {
            localStorage.setItem("palette", JSON.stringify(this.state.palette))
        });
        console.log(this.state.palette);
    }

    render() {
        console.log(this.state.palette);
        return (
            <div className="App">
                <div className="App-body">
                    <Router basename="/">
                        <Navbar className="Navbar" bg="#fbfbf8" fixed="top">
                            <Link to="/"><Navbar.Brand>intuitive colors</Navbar.Brand></Link>
                            <Nav className="mr-auto">
                                <Link to="/"><Nav.Link>home</Nav.Link></Link>
                                <Nav.Link href="https://github.com/seijoh/intuitive-colors">documentation</Nav.Link>
                            </Nav>
                            <Navbar.Text>
                                <a href="https://github.com/seijoh">&#169; seijoh</a> on github for cs50.
                            </Navbar.Text>
                        </Navbar>
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

            // <div className="App">
            //     <header className="App-header">
            //         <FullPalette setPalette = {this.setPalette} base = {this.state.palette}/>
            //         <ColorStation setPalette = {this.setPalette}/>
            //     </header>
            // </div>
        );
    }
}

export default App;
