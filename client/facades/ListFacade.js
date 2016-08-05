import _ from 'lodash';
import CardFacade from './CardFacade';

class ListFacade {
  constructor(response) {
    this.id = response._id;
    this.name = response.name || '';
    const cards = _.compact(response.cards);
    this.cards = _.isEmpty(cards) ?
      [] : cards.map(card => new CardFacade(card));
  }
}

export default ListFacade;
