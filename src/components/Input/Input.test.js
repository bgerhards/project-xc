import React from 'react';
import { shallow, mount } from 'enzyme';
import Input from './Input';

import Button from '../Button/Button';

describe('Input', () => {
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
        shallow(<Input options={options} />);
    });
});