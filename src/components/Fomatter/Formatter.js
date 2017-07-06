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
            formattedCode: '',
            inputOptions: {
			    lineNumbers: true,
                mode: 'xml',
                autofocus: true,
                theme: 'material',
                matchTags: { 
                    bothTags: true
                }
            },
            outputOptions: {
			    lineNumbers: true,
                mode: 'xml',
                theme: 'material',
                matchTags: { 
                    bothTags: true
                }
            }
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
        const { mode } = this.state.outputOptions;
        const originalCode = this.state.originalCode.trim();

        let formattedCode = ''; 

        if(mode === 'xml') {
            formattedCode = pd.xml(originalCode);

            const newState = Object.assign({}, this.state, { formattedCode });
            this.setState(newState);
        }
        else if(mode === 'application/json') {
            ps(this.state.originalCode, { trim: true }, (err, result) => {
                formattedCode = pd.json(result);

                const newState = Object.assign({}, this.state, { formattedCode });

                this.setState(newState);
            });            
        }                
    }

    handleMinifyClick() {
        const formattedCode = pd.xmlmin(this.state.originalCode.trim());        
        const newState = Object.assign({}, this.state, { formattedCode });

        this.setState(newState);
    }

    handleConvertClick() {
        const { mode } = this.state.inputOptions;
        
        if(mode === 'xml') {
            ps(this.state.originalCode, { trim: true }, (err, result) => {
                const formattedCode = pd.json(JSON.stringify(result));            
                const outputOptions = Object.assign({}, this.state.outputOptions, { mode: 'application/json' });

                this.setState({ formattedCode, outputOptions });
            });
        }
        else if(mode === 'application/json') {

        }
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
                            options={this.state.inputOptions}
                        />
                    </div>
                    <div className="col-xs-6">
                        <Output 
                            formattedCode={this.state.formattedCode}
                            options={this.state.outputOptions}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

export default Formatter;