import React from 'react';
import { shallow } from 'enzyme';

import Header from './Header';

describe('Header component', () => {
  it('renders without crashing', () => {
    shallow(<Header />);
  });

  it('renders title message', () => {
    const wrapper = shallow(<Header />);
    const title = <h1>XML Formatter</h1>;

    expect(wrapper).toContainReact(title);
  });
});