import React from 'react';
import { shallow } from 'enzyme';
import Output from './Output';

describe('Output', () => {

    it('renders without crashing', () => {
        shallow(<Output />);
    });
});