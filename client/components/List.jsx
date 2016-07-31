import React from 'react';
import { connect } from 'react-redux';

require('../stylesheets/list.scss');
require('../stylesheets/cards.scss');

class List extends React.Component {
  render() {
    const colStyle = {
      left: `${this.props.index * 280 + (40 * this.props.index)}px`
    }

    return (
      <li 
        className="list"
        style={colStyle}
      >
        <p className="list__center-container list__name">{this.props.name}</p>
        <ul className="cards">
          {this.props.cards.map((card, idx) => <li className="cards__card" key={`list-card-${idx}`}>{card.name}</li>)}
        </ul>
        <div className="list__center-container">
          <button 
            className="btn btn-default list__add-card"
            onClick={this.props.openAddCardModal}
          >
            Add card...
          </button>
        </div>
      </li>
    );
  }
}



export default List;
