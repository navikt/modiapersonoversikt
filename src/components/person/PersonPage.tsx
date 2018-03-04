import * as React from 'react';

interface PersonPage {
    fodselsnummer: string;
}

function PersonPage({fodselsnummer}: PersonPage) {
    return (
        <div>
            <p>{fodselsnummer}</p>
        </div>
    );
}

export default PersonPage;
