import React from 'react';
import { shallow } from 'enzyme';
import Output from './Output';

describe('Output', () => {
    let outputOptions = {
        lineNumbers: true,
        mode: 'xml',
        theme: 'material',
        matchTags: {
            bothTags: true
        }
    };

    it('renders without crashing', () => {
        shallow(<Output options={outputOptions} />);
    });

    it('renders with mode selected', () => {
        const wrapper = shallow(<Output options={outputOptions} />);
        const select = wrapper.find('select');

        expect(select).toHaveValue('xml');
    });
});