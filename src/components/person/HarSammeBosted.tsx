import * as React from 'react';

interface Props {
    harSammeBosted?: boolean;
    skalVise?: boolean | string;
}

function BorMedBruker({ harSammeBosted, skalVise }: Props) {
    if (harSammeBosted === undefined || !skalVise) {
        return null;
    } else if (harSammeBosted) {
        return <>Bor med bruker</>;
    } else {
        return <>Bor ikke med bruker</>;
    }
}

export default BorMedBruker;
