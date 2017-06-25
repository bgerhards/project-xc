import React from 'react';
import '@material/button/dist/mdc.button.css';

import './Button.css';

export default ({ children, disabled = false, onClick }) => {
    const handleClick = e => onClick();
    
    return (
        <button className="mdc-button mdc-button--raised" disabled={disabled} onClick={handleClick}>
            {children}
        </button>
    )
};