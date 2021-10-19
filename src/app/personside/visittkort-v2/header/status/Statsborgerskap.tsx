import * as React from 'react';
import { capitalizeName } from '../../../../../utils/string-utils';
import { Person } from '../../PersondataDomain';

interface Props {
    person: Person;
}

function formaterStatsborgerskapMedRiktigCasing(statsborgerskap: string): string {
    return statsborgerskap
        .toLowerCase()
        .split(' ')
        .map(capitalizeName)
        .join(' ')
        .split('-')
        .map(capitalizeName)
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
