import React, { Component } from 'react';
import { pd } from 'pretty-data';
import { parseString as ps } from 'xml2js';

import './Formatter.css';

import Input from '../Input/Input';
import Output from '../Output/Output';

class Formatter extends Component {
    constructor(props) {
        super(props);

        this.state = {
            originalCode: '',
            formattedCode: ''
        };

        this.handleChange = this.handleChange.bind(this);

        this.handleFormatClick = this.handleFormatClick.bind(this);
        this.handleMinifyClick = this.handleMinifyClick.bind(this);
        this.handleConvertClick = this.handleConvertClick.bind(this);
    }

    handleChange(newCode) {
        const newState = Object.assign({}, this.state, { originalCode: newCode });
        this.setState(newState);
    }

    handleFormatClick() {
        const formattedCode = pd.xml(this.state.originalCode.trim());
        const newState = Object.assign({}, this.state, { formattedCode });

        this.setState(newState);
    }

    handleMinifyClick() {
        const formattedCode = pd.xmlmin(this.state.originalCode.trim());
        const newState = Object.assign({}, this.state, { formattedCode });

        this.setState(newState);
    }

    handleConvertClick() {
        ps(this.state.originalCode, { trim: true }, (err, result) => {
            console.log(result);
        });
    }

    render() {
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-xs-6">
                        <Input
                            originalCode={this.state.originalCode}
                            handleChange={this.handleChange}
                            handleFormatClick={this.handleFormatClick}
                            handleMinifyClick={this.handleMinifyClick}
                            handleConvertClick={this.handleConvertClick}
                        />
                    </div>
                    <div className="col-xs-6">
                        <Output formattedCode={this.state.formattedCode} />
                    </div>
                </div>
            </div>
        );
    }
}

export default Formatter;