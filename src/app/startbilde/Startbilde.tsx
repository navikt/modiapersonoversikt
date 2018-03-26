import * as React from 'react';
import KnappBase from 'nav-frontend-knapper';

function snarveiTilAremark() {
    location.href = location.href + 'person/10108000398';
}

function Startbilde() {
    return (
        <div className="startbilde">
            <KnappBase onClick={() => snarveiTilAremark()} type="hoved">
                Snarvei til Aremark!
            </KnappBase>
            <KnappBase type="hoved">
                Plukk en oppgave!
            </KnappBase>
        </div>
    );
}

export default Startbilde;