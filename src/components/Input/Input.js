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
    }

    handleChange(newCode) {
        this.props.onChange(newCode);
    }

    render() {
        return (
            <div className="input">
                <CodeMirror options={this.state.options} onChange={this.handleChange} />
            </div>
        );
    }
}

export default Input;