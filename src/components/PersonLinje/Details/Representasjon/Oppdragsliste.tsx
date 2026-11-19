import { Accordion, BodyShort, Heading, InlineMessage, Tag, VStack } from '@navikt/ds-react';
import dayjs from 'dayjs';
import { KopierFnrKnapp } from 'src/components/PersonLinje/common/KopierFnrKnapp';
import Personopplysninger from 'src/components/PersonLinje/Personopplysninger';
import { hentSkjulingsaarsakTekst } from 'src/components/PersonLinje/skjulingsaarsak';
import { hentNavn, hentPeriodeTekst } from 'src/components/PersonLinje/utils';
import type { Fullmaktsoppdrag, Vergeoppdrag } from 'src/lib/types/modiapersonoversikt-api';
import { formaterRettighetstemaer } from 'src/utils/fullmakt-utils';
import { formaterDato } from 'src/utils/string-utils';

type Oppdrag = Fullmaktsoppdrag | Vergeoppdrag;
type Status = 'Aktiv' | 'Fremtidig' | 'Historisk';

function hentStatus(oppdrag: Oppdrag): Status {
    if ('aktivt' in oppdrag) {
        return oppdrag.aktivt ? 'Aktiv' : 'Historisk';
    }
    if (dayjs(oppdrag.gyldigFraOgMed).isAfter(dayjs(), 'day')) {
        return 'Fremtidig';
    }
    return oppdrag.gyldigTilOgMed && dayjs(oppdrag.gyldigTilOgMed).isBefore(dayjs(), 'day') ? 'Historisk' : 'Aktiv';
}

function hentOppdragsnavn({ person }: Oppdrag) {
    return person.skjulingsaarsak
        ? hentSkjulingsaarsakTekst(person.skjulingsaarsak, person.tilgangsavslag)
        : hentNavn(person.navn, 'Navn ikke tilgjengelig');
}

function Oppdragsdetaljer({ oppdrag }: { oppdrag: Oppdrag }) {
    const { person } = oppdrag;
    const leserettigheter = formaterRettighetstemaer(oppdrag.leserettigheter);
    const skriverettigheter = formaterRettighetstemaer(oppdrag.skriverettigheter);
    return (
        <VStack gap="space-8">
            <Personopplysninger skjulingsaarsak={person.skjulingsaarsak} tilgangsavslag={person.tilgangsavslag}>
                <VStack align="start">
                    <BodyShort size="small">{hentNavn(person.navn, 'Navn ikke tilgjengelig')}</BodyShort>
                    {person.ident && <KopierFnrKnapp fnr={person.ident} />}
                </VStack>
            </Personopplysninger>
            {'aktivt' in oppdrag ? (
                <>
                    <BodyShort size="small">Vergemålstype: {oppdrag.vergemaalstype}</BodyShort>
                    <BodyShort size="small">Gyldig fra: {formaterDato(oppdrag.gyldigFraOgMed)}</BodyShort>
                </>
            ) : (
                <BodyShort size="small">
                    Gyldig: {hentPeriodeTekst(oppdrag.gyldigFraOgMed, oppdrag.gyldigTilOgMed)}
                </BodyShort>
            )}
            {leserettigheter && <BodyShort size="small">Leserettigheter: {leserettigheter}</BodyShort>}
            {skriverettigheter && <BodyShort size="small">Skriverettigheter: {skriverettigheter}</BodyShort>}
        </VStack>
    );
}

export function Oppdragsliste({
    tittel,
    oppdrag,
    harFeil
}: {
    tittel: 'Er verge for' | 'Har fullmakt for';
    oppdrag: Oppdrag[];
    harFeil: boolean;
}) {
    if (oppdrag.length === 0 && !harFeil) {
        return null;
    }
    const rekkefolge: Record<Status, number> = { Aktiv: 0, Fremtidig: 1, Historisk: 2 };
    const sortert = oppdrag.toSorted(
        (a, b) =>
            rekkefolge[hentStatus(a)] - rekkefolge[hentStatus(b)] ||
            b.gyldigFraOgMed.localeCompare(a.gyldigFraOgMed) ||
            String(a.id).localeCompare(String(b.id))
    );
    return (
        <VStack gap="space-8" as="section" aria-label={tittel}>
            <Heading size="xsmall" level="4">
                {tittel}
            </Heading>
            {harFeil && (
                <InlineMessage status="warning" size="small">
                    {tittel === 'Er verge for'
                        ? 'Kunne ikke hente hvem personen er verge for.'
                        : 'Kunne ikke hente hvem personen har fullmakt for.'}
                </InlineMessage>
            )}
            {sortert.length > 0 && (
                <Accordion size="small" indent={false}>
                    {sortert.map((forhold) => {
                        const status = hentStatus(forhold);
                        return (
                            <Accordion.Item key={forhold.id}>
                                <Accordion.Header className="wrap-anywhere">
                                    <VStack as="span" align="start">
                                        <span>{hentOppdragsnavn(forhold)}</span>
                                        <Tag
                                            variant="moderate"
                                            size="xsmall"
                                            data-color={status === 'Aktiv' ? 'success' : 'neutral'}
                                        >
                                            {status}
                                        </Tag>
                                    </VStack>
                                </Accordion.Header>
                                <Accordion.Content>
                                    <Oppdragsdetaljer oppdrag={forhold} />
                                </Accordion.Content>
                            </Accordion.Item>
                        );
                    })}
                </Accordion>
            )}
        </VStack>
    );
}
