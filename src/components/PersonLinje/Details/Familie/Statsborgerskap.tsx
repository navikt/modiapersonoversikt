import { EarthIcon } from '@navikt/aksel-icons';
import { BodyShort, HStack } from '@navikt/ds-react';
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
    const { data } = usePersonData();

    const person = data?.person;
    if (!person || person.statsborgerskap.isEmpty()) {
        return null;
    }

    const statsborgerskap = person.statsborgerskap.map((statsborgerskap) =>
        capitalizeStatsborgerskap(statsborgerskap.land.beskrivelse)
    );

    return (
        <HStack gap="1" align="center">
            <EarthIcon className="text-ax-text-neutral-subtle" fontSize="1.2rem" />
            {statsborgerskap.length > 1 ? (
                <BodyShort title="Flere statsborgerskap:" size="small" className="text-ax-text-neutral-subtle">
                    {statsborgerskap.join(', ')}
                </BodyShort>
            ) : (
                <BodyShort title="Statsborgerskap:" size="small" className="text-ax-text-neutral-subtle">
                    {statsborgerskap}
                </BodyShort>
            )}
        </HStack>
    );
};

export default Statsborgerskap;
