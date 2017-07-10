import React from 'react';
import { shallow } from 'enzyme';

import { pd } from 'pretty-data';

import Formatter from './Formatter';

describe('Formatter', () => {

    it('renders without crashing', () => {
        shallow(<Formatter />);
    });
});