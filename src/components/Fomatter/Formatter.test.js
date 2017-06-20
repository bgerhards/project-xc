import React from 'react';
import { shallow } from 'enzyme';
import Formatter from './Formatter';

describe('Formatter', () => {

    it('renders without crashing', () => {
        shallow(<Formatter />);
    });
});