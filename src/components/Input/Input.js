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
    
    handleCodeChange = (newCode) => this.props.handleChange(newCode);

    handleFormatClick = () => this.props.handleFormatClick();
    handleMinifyClick = () => this.props.handleMinifyClick();        

    handleInputModeChange = (inputMode) => this.props.handleInputModeChange(inputMode);
    handleIndentModeChange = (indentMode) => this.props.handleIndentModeChange(indentMode);
    handleIndentQuantityChange = (indentQuantity) => this.props.handleIndentQuantityChange(indentQuantity);

    handleOutputModeChange = (e) => this.props.handleOutputModeChange(e.target.value);

    render() {
        return (
            <div className="Input">
                <h2>Input</h2>
                <OptionsBar 
                    options={this.props.options}
                    indentMode={this.props.indentMode}
                    indentQuantity={this.props.indentQuantity}
                    handleModeChange={this.handleInputModeChange}
                    handleIndentModeChange={this.handleIndentModeChange}
                    handleIndentQuantityChange={this.handleIndentQuantityChange}
                />
                <CodeMirror 
                    value={this.props.originalCode}
                    options={this.props.options}
                    onChange={this.handleCodeChange}
                />
                <br />
                <div className="Input__Actions">
                    <div className="row">
                        <div className="col-xs">
                            <Button onClick={this.handleFormatClick}>Format</Button>
                            <Button onClick={this.handleMinifyClick}>Minify</Button>
                        </div>
                        <div className="col-xs end-xs middle-xs">
                            <select 
                                className="mdc-select"
                                name="tabSize"
                                id="tabSize"
                                onChange={this.handleOutputModeChange}
                                value={this.props.outputMode}>
                                <option value="xml">XML</option>
                                <option value="application/json">JSON</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Input;