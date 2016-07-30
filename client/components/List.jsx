import React from 'react';
import { connect } from 'react-redux';

require('../stylesheets/list.scss');

class List extends React.Component {
  render() {
    const colStyle = {
      left: `${this.props.index * 280 + (20 * this.props.index)}px`
    }

    return (
      <li 
        className="list"
        style={colStyle}
      >
        <p>{this.props.name}</p>
        <ul>
          {this.props.cards.map((card, idx) => <li key={`list-card-${idx}`}>{card.name}</li>)}
        </ul>
        <button 
          className="btn btn-default"
          onClick={this.props.openAddCardModal}
        >
          Add card...
        </button>
      </li>
    );
  }
}



export default List;
