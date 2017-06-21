import React, { Component } from 'react';
import CodeMirror from 'react-codemirror';
import 'codemirror/mode/xml/xml';

import 'codemirror/lib/codemirror.css';
import './Output.css';

class Output extends Component {
    constructor(props) {
        super(props);

        this.state = {
            options: {
			    lineNumbers: true,
                mode: 'xml',
                readOnly: true
            }
        };
    }

    render() {
        return (
            <div className="output">
                <h2>Output</h2>
                <CodeMirror value={this.props.formattedCode} options={this.state.options} />
            </div>
        );
    }
}

export default Output;