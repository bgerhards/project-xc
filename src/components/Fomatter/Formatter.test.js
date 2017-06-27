import React from 'react';
import { shallow } from 'enzyme';

import Formatter from './Formatter';

describe('Formatter', () => {

    it('renders without crashing', () => {
        shallow(<Formatter />);
    });

    it('minifies code', () => {
        const originalCode = '<foo>\n\n<bar>foo\t</bar>\n\n\t</foo>\n';

        const wrapper = shallow(<Formatter />);
        const instance = wrapper.instance();

        instance.setState({ originalCode });

        const formattedCode = '<foo><bar>foo</bar></foo>';

        instance.handleMinifyClick();

        expect(instance.state.formattedCode).toEqual(formattedCode);
    });
});