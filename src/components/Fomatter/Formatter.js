import React, {Component} from 'react';
import {SweetData as sd} from 'sweet-data';
import {parseString as ps, Builder} from 'xml2js';

import './Formatter.css';

import Input from '../Input/Input';
import Output from '../Output/Output';

import { CONVERT_METHODS } from './Formatter.constants';

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
            indentMode: 'SPACE',
            indentQuantity: 2
        };

        this.handleChange = this
            .handleChange
            .bind(this);

        this.handleFormatClick = this
            .handleFormatClick
            .bind(this);
        this.handleMinifyClick = this
            .handleMinifyClick
            .bind(this);

        this.handleInputModeChange = this
            .handleInputModeChange
            .bind(this);
        this.handleIndentModeChange = this
            .handleIndentModeChange
            .bind(this);
        this.handleIndentQuantityChange = this
            .handleIndentQuantityChange
            .bind(this);

        this.handleOutputModeChange = this
            .handleOutputModeChange
            .bind(this);
    }

    handleChange(newCode) {
        const newState = Object.assign({}, this.state, {originalCode: newCode});
        this.setState(newState);
    }

    handleFormatClick() {
        const { mode: inputMode } = this.state.inputOptions;
        const { mode: outputMode } = this.state.outputOptions;

        const { indentMode, indentQuantity } = this.state;

        sd.setStep(indentQuantity, indentMode);

        this.sendAnalyticsEvent('Formatter', 'format', `${inputMode} => ${outputMode}`);

        this.handleConvert(this.state.originalCode.trim(), inputMode, outputMode)
            .then(originalCode => sd[CONVERT_METHODS[outputMode]](originalCode))
            .then(formattedCode => {
                const newState = Object.assign({}, this.state, {formattedCode});

                this.setState(newState);
            });
    }

    handleMinifyClick() {
        const { mode: inputMode } = this.state.inputOptions;
        const { mode: outputMode}  = this.state.outputOptions;

        const { indentMode, indentQuantity } = this.state;

        sd.setStep(indentQuantity, indentMode);

        this.sendAnalyticsEvent('Formatter', 'minify', `${inputMode} => ${outputMode}`);

        this.handleConvert(this.state.originalCode.trim(), inputMode, outputMode)
            .then(originalCode => sd[CONVERT_METHODS[outputMode] + 'min'](originalCode))
            .then(formattedCode => {
                const newState = Object.assign({}, this.state, {formattedCode});
                this.setState(newState);
            });
    }

    handleConvert(originalCode, inputMode, outputMode) {
        return new Promise((resolve, reject) => {
            inputMode !== outputMode
                ? resolve(this[CONVERT_METHODS[outputMode] + 'Conversion'](originalCode, inputMode))
                : resolve(originalCode)
        })
    }

    xmlConversion(originalCode, inputMode) {
        return new Promise((resolve, reject) => {
            let xml = '';
            if (inputMode === 'application/json') {
                const builder = new Builder();
                resolve(builder.buildObject(JSON.parse(originalCode)));
            } else {
                resolve(xml);
            }
        })
    }

    jsonConversion(originalCode, inputMode) {
        return new Promise((resolve, reject) => {
            if (inputMode === 'xml') {
                ps(this.state.originalCode, {
                    trim: true
                }, (err, result) => {
                    resolve(JSON.stringify(result));
                });
            } else {
                resolve(originalCode);
            }
        })
    }

    handleInputModeChange(mode) {
        const inputOptions = Object.assign({}, this.state.inputOptions, {mode});
        const newState = Object.assign({}, this.state, {inputOptions});

        this.sendAnalyticsEvent('Options', 'inputMode', mode);

        this.setState(newState);
    }

    handleIndentModeChange(indentMode) {
        const newState = Object.assign({}, this.state, {indentMode});

        this.sendAnalyticsEvent('Options', 'indentMode', indentMode);

        this.setState(newState);
    }

    handleIndentQuantityChange(indentQuantity) {
        const newState = Object.assign({}, this.state, {indentQuantity});

        this.sendAnalyticsEvent('Options', 'indentQuantity', indentQuantity);

        this.setState(newState);
    }

    handleOutputModeChange(mode) {
        const outputOptions = Object.assign({}, this.state.outputOptions, {mode});
        const newState = Object.assign({}, this.state, {outputOptions});

        this.sendAnalyticsEvent('Options', 'outputMode', mode);

        this.setState(newState);
    }

    sendAnalyticsEvent = (eventCategory, eventAction, eventLabel) => {
        window.ga('send', 'event', eventCategory, eventAction, eventLabel);
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
                            handleInputModeChange={this.handleInputModeChange}
                            handleOutputModeChange={this.handleOutputModeChange}
                            options={this.state.inputOptions}
                            outputMode={this.state.outputOptions.mode}
                            indentMode={this.state.indentMode}
                            indentQuantity={this.state.indentQuantity}
                            handleIndentModeChange={this.handleIndentModeChange}
                            handleIndentQuantityChange={this.handleIndentQuantityChange}/>
                    </div>
                    <div className="col-xs-6">
                        <Output
                            formattedCode={this.state.formattedCode}
                            options={this.state.outputOptions}/>
                    </div>
                </div>
            </div>
        );
    }
}

export default Formatter;