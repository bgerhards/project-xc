import React, { Component } from 'react';
import './Formatter.css';

import Input from '../Input/Input';

class Formatter extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-xs-6">
                        <Input />
                    </div>
                    <div className="col-xs-6">
                        Output
                    </div>
                </div>
            </div>
        );
    }
}

export default Formatter;