import React from 'react';
require('../stylesheets/modal.scss');

class Modal extends React.Component {
  constructor(props) {
    super(props);
    this.state = { visible: true };
    this.saveList = this.saveList.bind(this);
  }

  saveList() {

  }

  render() {
    const modalStyle = {
      display: this.state.visible ? 'block' : 'none'
    }

    return (
      <div 
        className="everkan-modal-overlay"
        style={modalStyle}
      >
        <div className="everkan-modal__content">
          <div>
            <label htmlFor="list-name">List name:</label>
            <input type="text" />
          </div>
          <div>
            <button onClick={this.saveList} className="btn btn-default">Save list</button>
          </div>
        </div>
      </div>
    );
  }
}

export default Modal;
