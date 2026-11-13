import { BodyShort, Button, InlineMessage, VStack } from '@navikt/ds-react';
import { Fullmakt } from 'src/components/PersonLinje/Details/Representasjon/Fullmakt';
import { RettsligHandleevne } from 'src/components/PersonLinje/Details/Representasjon/RettsligHandleevne';
import Vergemal from 'src/components/PersonLinje/Details/Representasjon/Vergemal';
import { usePersonData, useRepresentasjonsoppdrag } from 'src/lib/clients/modiapersonoversikt-api';
import {
    PersonDataFeilendeSystemer,
    RepresentasjonsoppdragFeilendeSystemer
} from 'src/lib/types/modiapersonoversikt-api';
import { Oppdragsliste } from './Oppdragsliste';

export const Representasjon = () => {
    const { data } = usePersonData();
    const representasjonsoppdrag = useRepresentasjonsoppdrag();
    const person = data?.person;
    const reprApiFeil = data?.feilendeSystemer.includes(PersonDataFeilendeSystemer.REPR_API) ?? false;

    const ingenData =
        !reprApiFeil &&
        representasjonsoppdrag.isSuccess &&
        representasjonsoppdrag.data.feilendeSystemer.length === 0 &&
        representasjonsoppdrag.data.fullmaktsgivere.length === 0 &&
        representasjonsoppdrag.data.vergehavere.length === 0 &&
        person?.vergemal?.isEmpty() &&
        person?.historiskeVergemal?.isEmpty() &&
        person?.fullmektige?.isEmpty() &&
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
            {representasjonsoppdrag.isPending && (
                <BodyShort size="small" role="status">
                    Henter hvem personen representerer …
                </BodyShort>
            )}
            {representasjonsoppdrag.isError && (
                <VStack gap="space-8" align="start">
                    <InlineMessage status="warning" size="small">
                        Kunne ikke hente hvem personen er verge eller har fullmakt for.
                    </InlineMessage>
                    <Button
                        size="small"
                        variant="secondary"
                        loading={representasjonsoppdrag.isFetching}
                        onClick={() => representasjonsoppdrag.refetch()}
                    >
                        Prøv igjen
                    </Button>
                </VStack>
            )}
            {representasjonsoppdrag.data && (
                <>
                    <Oppdragsliste
                        tittel="Er verge for"
                        oppdrag={representasjonsoppdrag.data.vergehavere}
                        harFeil={representasjonsoppdrag.data.feilendeSystemer.includes(
                            RepresentasjonsoppdragFeilendeSystemer.VERGEMAL
                        )}
                    />
                    <Oppdragsliste
                        tittel="Har fullmakt for"
                        oppdrag={representasjonsoppdrag.data.fullmaktsgivere}
                        harFeil={representasjonsoppdrag.data.feilendeSystemer.includes(
                            RepresentasjonsoppdragFeilendeSystemer.FULLMAKTER
                        )}
                    />
                    {representasjonsoppdrag.data.feilendeSystemer.some(
                        (feil) =>
                            feil === RepresentasjonsoppdragFeilendeSystemer.PERSONOPPLYSNINGER ||
                            feil === RepresentasjonsoppdragFeilendeSystemer.TILGANGSMASKINEN
                    ) && (
                        <InlineMessage status="warning" size="small">
                            Noen personopplysninger kunne ikke hentes.
                        </InlineMessage>
                    )}
                    {representasjonsoppdrag.data.feilendeSystemer.length > 0 && !representasjonsoppdrag.isError && (
                        <Button
                            size="small"
                            variant="secondary"
                            loading={representasjonsoppdrag.isFetching}
                            onClick={() => representasjonsoppdrag.refetch()}
                        >
                            Prøv igjen
                        </Button>
                    )}
                </>
            )}
        </VStack>
    );
};
