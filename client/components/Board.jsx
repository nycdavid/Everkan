import React from 'react';
import Modal from './Modal.jsx';
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
      <div className="board">
        <Modal />
        <button className="btn btn-default" onClick={this.addList}>Add a list...</button>
      </div>
    );
  }
}

export default Board;
