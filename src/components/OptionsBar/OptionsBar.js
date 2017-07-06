import React from 'react';

import './OptionsBar.css';

export default ({ options: { mode, tabSize }, handleModeChange, handleTabSizeChange }) => {
    const onModeChange = e => handleModeChange(e.target.value);
    const onTabSizeChange = e => handleTabSizeChange(e.target.value);

    return (
        <div className="OptionsBar">
            <div className="row">
                <div className="col">
                    <select name="mode" id="mode" onChange={onModeChange} value={mode}>
                        <option value="xml">XML</option>
                        <option value="application/json">JSON</option>
                    </select>
                </div>
                <div className="col">
                    <select name="tabSize" id="tabSize" onChange={onTabSizeChange} value={tabSize}>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                    </select>
                </div>
            </div>
        </div> 
    );
};