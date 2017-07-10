import React, { Component } from 'react';
import { pd } from 'pretty-data';
import { parseString as ps, Builder } from 'xml2js';

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
            },
            indentMode: 'TAB',
            indentQuantity: 2
        };

        this.handleChange = this.handleChange.bind(this);

        this.handleFormatClick = this.handleFormatClick.bind(this);
        this.handleMinifyClick = this.handleMinifyClick.bind(this);
        this.handleConvertClick = this.handleConvertClick.bind(this);

        this.handleInputModeChange = this.handleInputModeChange.bind(this);
        this.handleIndentModeChange = this.handleIndentModeChange.bind(this);
        this.handleIndentQuantityChange = this.handleIndentQuantityChange.bind(this);

        this.handleOutputModeChange = this.handleOutputModeChange.bind(this);
    }

    handleChange(newCode) {
        const newState = Object.assign({}, this.state, { originalCode: newCode });
        this.setState(newState);
    }

    handleFormatClick() {
        const {  mode: inputMode } = this.state.inputOptions;
        const { mode: outputMode } = this.state.outputOptions;
        const indentMode  = this.state.indentMode;
        const indentQuantity  = this.state.indentQuantity;

        const originalCode = this.state.originalCode.trim();
        pd.changeStepAndType(indentMode, indentQuantity);
        let formattedCode = '';

        if(outputMode === 'xml') {
            if(inputMode === 'xml') {
                formattedCode = pd.xml(originalCode);

                const newState = Object.assign({}, this.state, { formattedCode });
                this.setState(newState);
            }
        }

        if(outputMode === 'application/json') {
            if(inputMode === 'xml') {
                ps(this.state.originalCode, { trim: true }, (err, result) => {
                    formattedCode = pd.json(result);

                    const newState = Object.assign({}, this.state, { formattedCode });

                    this.setState(newState);
                });
            }
        }
    }

    handleMinifyClick() {
        const {  mode: inputMode } = this.state.inputOptions;
        const { mode: outputMode } = this.state.outputOptions;

        const originalCode = inputMode !== outputMode ? this.handleConvert(this.state.originalCode.trim(), inputMode, outputMode) : this.state.originalCode.trim();
        const outputMethod = (outputMode === 'application/json' ? 'json' : outputMode) + 'min';

        const formattedCode = pd[outputMethod](originalCode);
        const newState = Object.assign({}, this.state, { formattedCode });

        this.setState(newState);
    }

    handleConvert(originalCode, inputMode, outputMode){
        switch(outputMode){
            case 'xml': return this.xmlConversion(originalCode, inputMode);
            case 'application/json': return this.jsonConversion(originalCode, inputMode);
            default: return originalCode;
        }
    }

    xmlConversion(originalCode, inputMode){
        let formattedCode = '';
        if(inputMode === 'application/json'){
            const builder = new Builder();
            const xml = builder.buildObject(JSON.parse(originalCode));
            formattedCode = pd.xml(xml.trim());
        }

        return formattedCode;
    }

    jsonConversion(originalCode, inputMode){
        let formattedCode = '';
        if(inputMode === 'xml'){
            ps(this.state.originalCode, { trim: true }, (err, result) => {
                formattedCode = pd.json(result);
            });
        }

        return formattedCode;
    }

    handleConvertClick() {
        const { mode } = this.state.outputOptions;

        if(mode === 'xml') {
            ps(this.state.originalCode, { trim: true }, (err, result) => {
                const formattedCode = pd.json(JSON.stringify(result));
                const outputOptions = Object.assign({}, this.state.outputOptions, { mode: 'application/json' });

                const newState = Object.assign({}, this.state, { formattedCode, outputOptions });

                this.setState(newState);
            });
        }
        else if(mode === 'application/json') {
            const builder = new Builder();
            const xml = builder.buildObject(JSON.parse(this.state.originalCode));
            const formattedCode = pd.xml(xml.trim());

            const newState = Object.assign({}, this.state, { formattedCode });

            this.setState(newState);
        }
    }

    handleInputModeChange(mode) {
        const inputOptions = Object.assign({}, this.state.inputOptions, { mode });
        const newState = Object.assign({}, this.state, { inputOptions });

        this.setState(newState);
    }

    handleIndentModeChange(indentMode) {
        const newState = Object.assign({}, this.state, { indentMode });

        this.setState(newState);
    }

    handleIndentQuantityChange(indentQuantity) {
        const newState = Object.assign({}, this.state, { indentQuantity });

        this.setState(newState);
    }

    handleOutputModeChange(mode) {
        const outputOptions = Object.assign({}, this.state.outputOptions, { mode });
        const newState = Object.assign({} , this.state, { outputOptions });

        this.setState(newState);
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
                            handleInputModeChange={this.handleInputModeChange}
                            handleOutputModeChange={this.handleOutputModeChange}
                            options={this.state.inputOptions}
                            outputMode={this.state.outputOptions.mode}
                            indentMode={this.state.indentMode}
                            indentQuantity={this.state.indentQuantity}
                            handleIndentModeChange={this.handleIndentModeChange}
                            handleIndentQuantityChange={this.handleIndentQuantityChange}
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