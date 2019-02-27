import * as React from 'react';

interface Props {
    statsborgerskap?: string;
}

function uppercaseFørsteBokstav(ord: string) {
    return ord.substring(0, 1).toUpperCase() + ord.substring(1, ord.length);
}

export function formaterStatsborgerskapMedRiktigCasing(statsborgerskap: string): string {
    return statsborgerskap
        .toLowerCase()
        .split(' ')
        .map(uppercaseFørsteBokstav)
        .join(' ')
        .split('-')
        .map(uppercaseFørsteBokstav)
        .join('-');
}

export function Statsborgerskap({ statsborgerskap }: Props) {
    if (!statsborgerskap) {
        return <li title="Statsborgerskap">Ingen statsborgerskap registrert i NAV</li>;
    }

    const formatertStatsborgerskap = formaterStatsborgerskapMedRiktigCasing(statsborgerskap);

    return <li title="Statsborgerskap">{formatertStatsborgerskap}</li>;
}

export default Statsborgerskap;
