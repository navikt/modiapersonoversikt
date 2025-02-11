import { ChevronRightIcon } from '@navikt/aksel-icons';
import { BodyShort, Box, Button, HStack, Heading, Tag, VStack } from '@navikt/ds-react';
import { getRouteApi } from '@tanstack/react-router';
import type { TraadDto } from 'src/generated/modiapersonoversikt-api';
import type { Melding } from 'src/lib/types/modiapersonoversikt-api';
import { Temagruppe, temagruppeTekst } from 'src/lib/types/temagruppe';
import { twMerge } from 'tailwind-merge';
import { erFeilsendt, getFormattertMeldingsDato, nyesteMelding, traadstittel } from './utils';

function TildeltSaksbehandler({ traadId }: { traadId: string }) {
    //const tildelteOppgaver = useTildelteOppgaver();
    const tildelteOppgaver = {};

    if (tildelteOppgaver.paaBruker.map((oppgave) => oppgave.traadId).includes(traadId)) {
        return <EtikettSuksess>Tildelt meg</EtikettSuksess>;
    }

    return null;
}
function UnderArbeid({ traad }: { traad: TraadDto }) {
    const underArbeid = false;
    if (underArbeid)
        return (
            <Tag size="xsmall" variant="info">
                Under arbeid
            </Tag>
        );

    return null;
}

function Feilsendt({ traad }: { traad: TraadDto }) {
    if (erFeilsendt(traad)) {
        return (
            <Tag size="xsmall" variant="warning">
                Feilsendt
            </Tag>
        );
    }
    return null;
}

function Slettet({ melding }: { melding: Melding }) {
    if (melding.temagruppe === Temagruppe.InnholdSlettet) {
        return (
            <Tag size="xsmall" variant="error">
                Slettet
            </Tag>
        );
    }

    return null;
}
const routeApi = getRouteApi('/new/person/meldinger');

export const TraadItem = ({
    traad,
    handleClick
}: {
    traad: TraadDto;
    handleClick: (traadId: string) => void;
}) => {
    const sisteMelding = nyesteMelding(traad);
    // TODO: Finn melding under arbeid
    //
    const datoTekst = getFormattertMeldingsDato(sisteMelding);
    const tittel = traadstittel(traad);
    const aktivTraad = routeApi.useSearch().traadId;

    return (
        <Box.New
            padding="2"
            background="raised"
            className={twMerge(
                'cursor-pointer hover:bg-[var(--ax-bg-neutral-moderate-hover)] group',
                aktivTraad === traad.traadId &&
                    'bg-[var(--ax-bg-neutral-moderate)] border-[var(--ax-border-neutral-strong)]'
            )}
            borderColor="neutral-subtle"
            borderWidth="1"
            borderRadius="large"
            onClick={() => handleClick(traad.traadId)}
        >
            <HStack justify="space-between" gap="2">
                <Box.New>
                    <Heading size="xsmall" as="h3" level="3">
                        {tittel}
                    </Heading>
                    <HStack gap="2">
                        <BodyShort size="small" weight="semibold">
                            Tema:
                        </BodyShort>
                        <BodyShort size="small">{temagruppeTekst(traad.temagruppe as Temagruppe)}</BodyShort>
                    </HStack>
                    <BodyShort size="small" textColor="subtle">
                        {datoTekst}
                    </BodyShort>
                    <HStack gap="1" wrap>
                        <Feilsendt traad={traad} />
                        <Slettet melding={sisteMelding} />
                    </HStack>
                </Box.New>
                <VStack justify="center">
                    <Button
                        variant="tertiary-neutral"
                        size="small"
                        icon={
                            <ChevronRightIcon className="translate-x-0 group-hover:translate-x-1 transition-transform" />
                        }
                    />
                </VStack>
            </HStack>
        </Box.New>
    );
};
