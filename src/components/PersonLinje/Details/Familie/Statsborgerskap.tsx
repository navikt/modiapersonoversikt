import { BodyShort } from '@navikt/ds-react';
import { usePersonData } from 'src/lib/clients/modiapersonoversikt-api';
import { capitalizeName } from 'src/utils/string-utils';

const capitalizeStatsborgerskap = (statsborgerskap: string): string => {
    return statsborgerskap
        .toLowerCase()
        .split(' ')
        .map(capitalizeName)
        .join(' ')
        .split('-')
        .map(capitalizeName)
        .join('-');
};

const Statsborgerskap = () => {
    const {
        data: { person }
    } = usePersonData();

    if (person.statsborgerskap.isEmpty()) {
        return null;
    }

    const statsborgerskap = person.statsborgerskap.map((statsborgerskap) =>
        capitalizeStatsborgerskap(statsborgerskap.land.beskrivelse)
    );

    return (
        <>
            {statsborgerskap.length > 1 ? (
                <BodyShort title="Statsborgerskap" size="small">
                    Flere statsborgerskap: {statsborgerskap.join(', ')}
                </BodyShort>
            ) : (
                <BodyShort title="Statsborgerskap" size="small">
                    Statsborgerskap: {statsborgerskap}
                </BodyShort>
            )}
        </>
    );
};

export default Statsborgerskap;
