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
    
    handleChange = (newCode) => this.props.handleChange(newCode);
    format = () => this.props.handleFormatClick();
    minify = () => this.props.handleMinifyClick();
    convert = () => this.props.handleConvertClick();
    handleModeChange = (mode) => this.props.handleModeChange(mode);

    render() {
        return (
            <div className="input">
                <h2>Input</h2>
                <OptionsBar 
                    options={this.props.options}
                    handleModeChange={this.handleModeChange}
                />
                <CodeMirror 
                    value={this.props.originalCode}
                    options={this.props.options}
                    onChange={this.handleChange}
                />
                <br />
                <Button onClick={this.format}>Format</Button>
                <Button onClick={this.minify}>Minify</Button>
                <Button onClick={this.convert}>
                    {this.props.options.mode === 'xml' ? 'JSON' : 'XML'}
                </Button>
            </div>
        );
    }
}

export default Input;