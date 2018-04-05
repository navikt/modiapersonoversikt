import * as React from 'react';
import './gridStyle.css';

function GridLayout() {
    return(
        <div id="application">
            <div className="header">Header</div>
            <div className="left-column">Venstre</div>
            <div className="right-column">Høyre</div>
        </div>
    );
}

export default GridLayout;
