import { BodyShort, InlineMessage, VStack } from '@navikt/ds-react';
import { Fullmakt } from 'src/components/PersonLinje/Details/Representasjon/Fullmakt';
import { RettsligHandleevne } from 'src/components/PersonLinje/Details/Representasjon/RettsligHandleevne';
import Vergemal from 'src/components/PersonLinje/Details/Representasjon/Vergemal';
import { usePersonData } from 'src/lib/clients/modiapersonoversikt-api';
import { PersonDataFeilendeSystemer } from 'src/lib/types/modiapersonoversikt-api';
import { Oppdragsliste } from './Oppdragsliste';

export const Representasjon = () => {
    const { data } = usePersonData();
    if (!data) return null;

    const { person, feilendeSystemer } = data;
    const reprApiFeil = [
        PersonDataFeilendeSystemer.REPR_API,
        PersonDataFeilendeSystemer.REPR_API_FULLMAKTSGIVERE,
        PersonDataFeilendeSystemer.REPR_API_VERGEHAVERE
    ].some((system) => feilendeSystemer.includes(system));
    const ingenData =
        !reprApiFeil &&
        person.fullmaktsgivere.isEmpty() &&
        person.vergehavere.isEmpty() &&
        person.vergemal.isEmpty() &&
        person.historiskeVergemal.isEmpty() &&
        person.fullmektige.isEmpty() &&
        person.rettsligHandleevne.isEmpty();

    if (ingenData) {
        return (
            <BodyShort size="small" textColor="subtle">
                Ingen representasjonsdata
            </BodyShort>
        );
    }
    return (
        <VStack gap="space-16">
            <RettsligHandleevne />
            <Vergemal />
            <Fullmakt />
            <Oppdragsliste
                tittel="Er verge for"
                oppdrag={person.vergehavere}
                harFeil={feilendeSystemer.includes(PersonDataFeilendeSystemer.REPR_API_VERGEHAVERE)}
            />
            <Oppdragsliste
                tittel="Har fullmakt for"
                oppdrag={person.fullmaktsgivere}
                harFeil={feilendeSystemer.includes(PersonDataFeilendeSystemer.REPR_API_FULLMAKTSGIVERE)}
            />
            {(person.fullmaktsgivere.length > 0 || person.vergehavere.length > 0) &&
                feilendeSystemer.some(
                    (system) =>
                        system === PersonDataFeilendeSystemer.PDL_TREDJEPARTSPERSONER ||
                        system === PersonDataFeilendeSystemer.TILGANGSMASKINEN_TREDJEPARTSPERSONER
                ) && (
                    <InlineMessage status="warning" size="small">
                        Noen personopplysninger kunne ikke hentes.
                    </InlineMessage>
                )}
        </VStack>
    );
};
