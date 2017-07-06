import React from 'react';

import './OptionsBar.css';

export default ({ options: { mode, tabSize }, handleModeChange, handleTabSizeChange }) => {
    const onModeChange = e => handleModeChange(e.target.value);
    const onTabSizeChange = e => handleTabSizeChange(e.target.value);

    return (
        <div className="OptionsBar">
            <div className="row">
                <div className="col-sm-12">
                    <select 
                        className="mdc-select"
                        name="tabSize"
                        id="tabSize"
                        onChange={onTabSizeChange}
                        value={tabSize}
                    >
                        <option value="XML">XML</option>
                        <option value="application/json">JSON</option>
                    </select>
                </div>
            </div>
        </div> 
    );
};