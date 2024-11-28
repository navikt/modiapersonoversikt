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
    if (person.statsborgerskap.isEmpty()) {
        return null;
    }

    const gyldigeStatsborgerskap = person.statsborgerskap.map((statsborgerskap) =>
        formaterStatsborgerskapMedRiktigCasing(statsborgerskap.land.beskrivelse)
    );

    if (gyldigeStatsborgerskap.length > 1) {
        return <li title="Statsborgerskap">Flere statsborgerskap: {gyldigeStatsborgerskap.join(', ')}</li>;
    }
    return <li title="Statsborgerskap">{gyldigeStatsborgerskap}</li>;
}

export default Statsborgerskap;
