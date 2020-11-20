import logo from './logo.svg';
import './App.css';
import React from 'react';
import ColorStation from './ColorStation';

class Swatch extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            red: 255,
            green: 255,
            blue: 255
        };
    }
    return;
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <ColorStation/>
      </header>
    </div>
  );
}

export default App;
