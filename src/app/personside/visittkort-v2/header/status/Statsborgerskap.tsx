import * as React from 'react';
import { Statsborgerskap as StatsborgerskapInterface } from '../../PersondataDomain';

interface Props {
    statsborgerskap: StatsborgerskapInterface;
}

function uppercaseForsteBokstav(ord: string) {
    return ord.substring(0, 1).toUpperCase() + ord.substring(1, ord.length);
}

function formaterStatsborgerskapMedRiktigCasing(statsborgerskap: string): string {
    return statsborgerskap
        .toLowerCase()
        .split(' ')
        .map(uppercaseForsteBokstav)
        .join(' ')
        .split('-')
        .map(uppercaseForsteBokstav)
        .join('-');
}

function Statsborgerskap({ statsborgerskap }: Props) {
    const formatertStatsborgerskap = formaterStatsborgerskapMedRiktigCasing(statsborgerskap.land.beskrivelse);

    return <li title="Statsborgerskap">{formatertStatsborgerskap}</li>;
}

export default Statsborgerskap;
