import React from 'react';
import Board from './Board.jsx';
import '../stylesheets/layout.scss';

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Board />
    );
  }
}

export default App;
