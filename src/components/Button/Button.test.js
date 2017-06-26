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

    it('disables when disabled prop true', () => {
        const wrapper = shallow(<Button disabled={true}>Foobar</Button>);

        expect(wrapper).toBeDisabled();
    });

    it('enables by default', () => {
        const wrapper = shallow(<Button>Foobar</Button>);

        expect(wrapper).not.toBeDisabled();
    });

    it('executes onClick prop handler on click', () => {
        const mockOnClick = jest.fn();
        const wrapper = shallow(<Button onClick={mockOnClick}>Foobar</Button>);
        
        wrapper.simulate('click');

        expect(mockOnClick).toHaveBeenCalledTimes(1);
    });
});