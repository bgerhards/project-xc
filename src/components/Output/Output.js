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

        this.handleChange = this.handleChange.bind(this);
    }

    componentDidUpdate(newProps) {
        const cm = this.cm.getCodeMirror();
        cm.getDoc().setValue(this.props.formattedCode);
    }

    handleChange = newCode => {
        const cm = this.cm.getCodeMirror();
        cm.getDoc().setValue(this.props.formattedCode);
    }

    render() {
        return (
            <div className="output">
                <h2>Output</h2>
                <CodeMirror
                    ref={(cm) => this.cm = cm}
                    value={this.props.formattedCode}
                    options={this.state.options}
                />
            </div>
        );
    }
}

export default Output;