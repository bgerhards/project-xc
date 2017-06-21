import React, { Component } from 'react';
import CodeMirror from 'react-codemirror';
import 'codemirror/mode/xml/xml';

import 'codemirror/lib/codemirror.css';
import './Input.css';

class Input extends Component {
    constructor(props) {
        super(props);

        this.state = {
            options: {
			    lineNumbers: true,
                mode: 'xml',
                autofocus: true
            }
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    handleChange(newCode) {
        this.props.handleChange(newCode);
    }

    handleClick() {
        this.props.handleClick();
    }

    render() {
        return (
            <div className="input">
                <h2>Input</h2>
                <CodeMirror value={this.props.originalCode} options={this.state.options} onChange={this.handleChange} />
                <br />
                <button type="button" onClick={this.handleClick}>Format</button>
            </div>
        );
    }
}

export default Input;