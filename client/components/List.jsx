import React from 'react';
import { connect } from 'react-redux';
import modalDispatcher from '../dispatchers/modal';

require('../stylesheets/list.scss');
require('../stylesheets/cards.scss');

class List extends React.Component {
  render() {
    const colStyle = {
      left: `${this.props.index * 280 + (40 * this.props.index)}px`
    }
    const { openModal } = this.props;

    return (
      <li 
        className="list"
        style={colStyle}
      >
        <p className="list__center-container list__name">{this.props.name}</p>
        <ul className="cards">
          {this.props.cards.map((card, idx) => (
            <li 
              className="cards__card" 
              key={`list-card-${idx}`}
              onClick={() => { 
                openModal('ViewCard', {
                  name: card.name
                });
              }}
            >
              {card.name}
            </li>
          ))}
        </ul>
        <div className="list__center-container">
          <button 
            className="btn btn-default list__add-card"
            onClick={() => {
              openModal('AddCard', {
                listName: this.props.name,
                listId: this.props.listId,
              });
            }}
          >
            Add card...
          </button>
        </div>
      </li>
    );
  }
}

const ConnectedList = connect(
  () => { return {} },
  (dispatch) => { return modalDispatcher }
)(List);

export default ConnectedList;
