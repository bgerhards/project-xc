import React from 'react';
import { shallow } from 'enzyme';

import { pd } from 'pretty-data';

import Formatter from './Formatter';

describe('Formatter', () => {

    it('renders without crashing', () => {
        shallow(<Formatter />);
    });

    it('minifies code', () => {
        const originalCode = `
            <foo>
                <bar>bar1</bar>
                        <bar>bar2</bar>
            </foo>`;

        const wrapper = shallow(<Formatter />);
        const instance = wrapper.instance();

        instance.setState({ originalCode });

        const formattedCode = '<foo><bar>bar1</bar><bar>bar2</bar></foo>';

        instance.handleMinifyClick();

        expect(instance.state.formattedCode).toEqual(formattedCode);
    });

    it('formats code', () => {
        const originalCode = `
            <foo>
                <bar>bar1</bar>
                        <bar>bar2</bar>
            </foo>`;

        const wrapper = shallow(<Formatter />);
        const instance = wrapper.instance();

        instance.setState({ originalCode });

        const formattedCode = pd.xml(originalCode.trim());

        instance.handleFormatClick();

        expect(instance.state.formattedCode).toEqual(formattedCode);
    });
});