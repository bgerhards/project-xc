import React from 'react';
import { shallow } from 'enzyme';

import OptionsBar from './OptionsBar';

describe('OptionsBar', () => {
    let options = {
        lineNumbers: true,
        mode: 'xml',
        autofocus: true,
        theme: 'material',
        matchTags: {
            bothTags: true
        }
    };

    it('renders without crashing', () => {
        shallow(<OptionsBar options={options} />);
    });
});