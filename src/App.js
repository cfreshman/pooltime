import React, { Component } from 'react';
import './App.css';

import Upcoming from 'components/Upcoming';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="header">
          <div className="name"><span>pool</span>◐<span>time</span></div>
        </div>
        <div className="content">
          <Upcoming />
        </div>
        <div className="footer">
          <p>Made with <span role="img" aria-label="fire">🔥</span> by Cyrus Freshman</p>
        </div>
      </div>
    );
  }
}

export default App;
