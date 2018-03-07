import * as React from 'react';
import VisittkortContainer from '../visittkort/visittkort-container';

interface Personside {
    fodselsnummer: string;
}

function Personside({fodselsnummer}: Personside) {
    return (
        <div>
            <VisittkortContainer/>
        </div>
    );
}

export default Personside;
