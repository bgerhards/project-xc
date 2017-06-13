import React from 'react';
import { shallow } from 'enzyme';

import App from './App';

it('renders without crashing', () => {
  shallow(<App />);
});

it('renders welcome message', () => {
  const wrapper = shallow(<App />);
  const heading = <h1>XML Formatter</h1>;

  expect(wrapper).toContainReact(welcome);
});
