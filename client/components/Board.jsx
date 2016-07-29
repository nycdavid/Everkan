import React from 'react';
require('../stylesheets/board.scss');

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.addList = this.addList.bind(this);
  }

  addList() {
  }

  render() {
    return (
      <div>
        <button onClick={this.addList}>Add List</button>
      </div>
    );
  }
}

export default Board;
