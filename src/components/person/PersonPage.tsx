import * as React from 'react';
import VisittkortContainer from '../visittkort/visittkort-container';

interface PersonPage {
    fodselsnummer: string;
}

function PersonPage({fodselsnummer}: PersonPage) {
    return (
        <div>
            <VisittkortContainer/>
        </div>
    );
}

export default PersonPage;
