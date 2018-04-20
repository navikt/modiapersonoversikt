import * as React from 'react';

interface Props {
    statsborgerskap?: string;
}

function uppercaseFørsteBokstav(ord: string) {
    return ord.substring(0, 1).toUpperCase() + ord.substring(1, ord.length);
}

function formaterMedRiktigCasing(statsborgerskap: string): string {
    return statsborgerskap.toLowerCase()
        .split(' ').map(uppercaseFørsteBokstav).join(' ')
        .split('-').map(uppercaseFørsteBokstav).join('-');
}

function Statsborgerskap({statsborgerskap}: Props) {
    if (!statsborgerskap) {
        return (
            <>Ingen statsborgerskap registrert i NAV</>
        );
    }

    const formatertStatsborgerskap = formaterMedRiktigCasing(statsborgerskap);

    return (
        <>{formatertStatsborgerskap}</>
    );
}

export default Statsborgerskap;