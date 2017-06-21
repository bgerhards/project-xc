import React, { Component } from 'react';
import { pd } from 'pretty-data';

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
        this.handleClick = this.handleClick.bind(this);
    }

    handleChange(newCode) {
        const newState = Object.assign({}, this.state, { originalCode: newCode });
        this.setState(newState);
    }

    handleClick() {
        const formattedCode = pd.xml(this.state.originalCode);
        const newState = Object.assign({}, this.state, { formattedCode });

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
                            handleClick={this.handleClick}
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