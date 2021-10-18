import * as React from 'react';
import { Person } from '../../PersondataDomain';

interface Props {
    person: Person;
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

function Statsborgerskap({ person }: Props) {
    const statsborgerskap = person.statsborgerskap.firstOrNull();
    if (!statsborgerskap) {
        return null;
    }
    const formatertStatsborgerskap = formaterStatsborgerskapMedRiktigCasing(statsborgerskap.land.beskrivelse);

    return <li title="Statsborgerskap">{formatertStatsborgerskap}</li>;
}

export default Statsborgerskap;
