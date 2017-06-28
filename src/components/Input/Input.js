import React, { Component } from 'react';
import CodeMirror from 'react-codemirror';
import 'codemirror/mode/xml/xml';

import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css';

import './Input.css';

import Button from '../Button/Button';

class Input extends Component {
    constructor(props) {
        super(props);

        this.state = {
            options: {
			    lineNumbers: true,
                mode: 'xml',
                autofocus: true,
                theme: 'material'
            }
        };

        this.handleChange = this.handleChange.bind(this);

        this.format = this.format.bind(this);
        this.minify = this.minify.bind(this);
        this.convert = this.convert.bind(this);
    }

    handleChange(newCode) {
        this.props.handleChange(newCode);
    }

    format() {
        this.props.handleFormatClick();
    }

    minify() {
        this.props.handleMinifyClick();
    }

    convert() {
        this.props.handleConvertClick();
    }

    render() {
        return (
            <div className="input">
                <h2>Input</h2>
                <CodeMirror 
                    value={this.props.originalCode}
                    options={this.state.options}
                    onChange={this.handleChange}
                />
                <br />
                <Button onClick={this.format}>Format</Button>
                <Button onClick={this.minify}>Minify</Button>
                <Button onClick={this.convert}>JSON</Button>
            </div>
        );
    }
}

export default Input;