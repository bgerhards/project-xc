import React, { Component } from 'react';
import CodeMirror from 'react-codemirror';

import 'codemirror/mode/xml/xml';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/addon/edit/matchtags';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css';

import './Output.css';

import Button from '../Button/Button';

class Output extends Component {
    constructor(props) {
        super(props);

        this.handleClick = this.handleClick.bind(this);
    }

    componentDidUpdate(newProps) {
        const cm = this.cm.getCodeMirror();
        cm.getDoc().setValue(this.props.formattedCode);
    }

    handleClick(e) {
        let fakeElem = document.createElement('textarea');

        fakeElem.className = 'sr-only';
        fakeElem.value = this.props.formattedCode;

        let container = document.getElementById('output');
        container.appendChild(fakeElem);

        fakeElem.select();
        
        document.execCommand('selectAll')
        document.execCommand('copy', false, null);

        fakeElem.parentElement.removeChild(fakeElem);
    }

    render() {
        return (
            <div className="output" id="output">
                <h2>Output</h2>
                <CodeMirror
                    ref={(cm) => this.cm = cm}
                    value={this.props.formattedCode}
                    options={this.props.options}
                />
                <br />
                <Button onClick={this.handleClick}>Copy</Button>
            </div>
        );
    }
}

export default Output;