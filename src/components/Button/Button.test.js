import React from 'react';
import { shallow } from 'enzyme';

import Button from './Button';

describe('Button', () => {

    it('renders without crashing', () => {
        shallow(<Button>Foobar</Button>);
    });

    it('renders text', () => {
        const wrapper = shallow(<Button>Foobar</Button>);
        
        expect(wrapper).toIncludeText('Foobar');
    });
});