import React, { Component } from 'react';
import CodeMirror from 'react-codemirror';

import 'codemirror/mode/xml/xml';
import 'codemirror/addon/edit/matchtags';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css';

import './Input.css';

import Button from '../Button/Button';
import OptionsBar from '../OptionsBar/OptionsBar';

class Input extends Component {
    constructor(props) {
        super(props);

        this.handleChange = this.handleChange.bind(this);

        this.format = this.format.bind(this);
        this.minify = this.minify.bind(this);
        this.convert = this.convert.bind(this);

        this.handleModeChange = this.handleModeChange.bind(this);
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

    handleModeChange(mode) {
        console.log(mode);
    }

    handleTabSizeChange(tabSize) {
        console.log(tabSize);
    }

    render() {
        return (
            <div className="input">
                <h2>Input</h2>
                <OptionsBar 
                    options={this.props.options}
                    handleModeChange={this.handleModeChange}
                    handleTabSizeChange={this.handleTabSizeChange}
                />
                <CodeMirror 
                    value={this.props.originalCode}
                    options={this.props.options}
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