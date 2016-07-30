import React from 'react';

require('../stylesheets/list.scss');

const List = ({ name, index }) => {
  const colStyle = {
    left: `${index * 280 + (20 * index)}px`
  }
  return (
    <li 
      className="list"
      style={colStyle}
    >
      {name}
    </li>
  );
}

export default List;
