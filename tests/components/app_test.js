import React from 'react';
import { connect } from 'react-redux';
import { shallow } from 'enzyme';
import List from '../../client/components/List.jsx';

describe('foo', () => {
  it('should', () => {
    const subject = shallow(<List />);
    console.log(subject.text());
  });
});
