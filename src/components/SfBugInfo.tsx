import * as React from 'react';
import { AlertStripeFeil } from 'nav-frontend-alertstriper';

function SfBugInfo() {
    return (
        <AlertStripeFeil className="blokk-xs">
            Brukers innboks er deaktivert, og bruker kan for tiden ikke svare på spørsmål.
        </AlertStripeFeil>
    );
}

export default SfBugInfo;
