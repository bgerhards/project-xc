import React from 'react';

import './OptionsBar.css';

export default ({ options: { mode, value, tabSize }, handleModeChange }) => {
    const onModeChange = e => handleModeChange(e.target.value);

    return (
        <div className="OptionsBar">
            <div className="row">
                <div className="col-sm-12">
                    <select 
                        className="mdc-select"
                        name="mode"
                        id="mode"
                        onChange={onModeChange}
                        value={mode}
                    >
                        <option value="xml">XML</option>
                        <option value="application/json">JSON</option>
                    </select>
                    <select 
                        className="mdc-select"
                        name="indentMode"
                        id="indentMode"
                        value={value}
                    >
                        <option value="SPACE">SPACE</option>
                        <option value="TAB">TAB</option>
                    </select>
                    <select 
                        className="mdc-select"
                        name="indentQuantity"
                        id="indentQuantity"
                        value={value}
                    >
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                        <option value="8">8</option>
                        <option value="9">9</option>
                    </select>
                </div>
            </div>
        </div> 
    );
};