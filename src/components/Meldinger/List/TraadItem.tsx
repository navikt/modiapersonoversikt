import { ChevronRightIcon } from '@navikt/aksel-icons';
import { BodyShort, Box, Button, HStack, Heading, Tag, VStack } from '@navikt/ds-react';
import { getRouteApi } from '@tanstack/react-router';
import { atom, useAtomValue } from 'jotai';
import { useMemo } from 'react';
import Card from 'src/components/Card';
import type { TraadDto } from 'src/generated/modiapersonoversikt-api';
import { usePersonOppgaver } from 'src/lib/clients/modiapersonoversikt-api';
import { usePersonAtomValue } from 'src/lib/state/context';
import { dialogUnderArbeidAtom } from 'src/lib/state/dialog';
import type { Melding } from 'src/lib/types/modiapersonoversikt-api';
import { Temagruppe, temagruppeTekst } from 'src/lib/types/temagruppe';
import { twMerge } from 'tailwind-merge';
import { erFeilsendt, getFormattertMeldingsDato, nyesteMelding, traadstittel } from './utils';

function TildeltSaksbehandler({ traadId }: { traadId: string }) {
    const oppgaver = usePersonOppgaver();
    const fnr = usePersonAtomValue();
    const tildeltTilBruker = oppgaver.data.filter((oppg) => oppg.fødselsnummer === fnr);

    if (tildeltTilBruker.map((oppgave) => oppgave.traadId).includes(traadId)) {
        return (
            <Tag size="xsmall" variant="info">
                Tildelt meg
            </Tag>
        );
    }

    return null;
}
function UnderArbeid({ traadId }: { traadId: string }) {
    const isUnderArbeid = useAtomValue(useMemo(() => atom((get) => get(dialogUnderArbeidAtom) === traadId), [traadId]));

    if (isUnderArbeid)
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
    const datoTekst = getFormattertMeldingsDato(sisteMelding);
    const tittel = traadstittel(traad);
    const aktivTraad = routeApi.useSearch().traadId;

    return (
        <Card
            data-testid="traaditem"
            padding="2"
            className={twMerge(
                'cursor-pointer hover:bg-[var(--ax-bg-neutral-moderate-hover)] group',
                aktivTraad === traad.traadId && 'bg-ax-bg-neutral-moderate border-ax-border-neutral-strong'
            )}
            onClick={() => handleClick(traad.traadId)}
            as="li"
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
                        <UnderArbeid traadId={traad.traadId} />
                        <Feilsendt traad={traad} />
                        <Slettet melding={sisteMelding} />
                        <TildeltSaksbehandler traadId={traad.traadId} />
                    </HStack>
                </Box.New>
                <VStack justify="center">
                    <Button
                        variant="tertiary-neutral"
                        size="small"
                        name="Åpne"
                        aria-label="Åpne"
                        icon={
                            <ChevronRightIcon
                                aria-hidden
                                className="translate-x-0 group-hover:translate-x-1 transition-transform"
                            />
                        }
                    />
                </VStack>
            </HStack>
        </Card>
    );
};
