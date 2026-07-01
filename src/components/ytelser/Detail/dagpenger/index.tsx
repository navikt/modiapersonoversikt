import { Accordion, Heading, VStack } from '@navikt/ds-react';
import { Normaltekst } from 'nav-frontend-typografi';
import Card from 'src/components/Card';
import { TitleValuePairsComponent } from 'src/components/ytelser/Detail';
import { periodeEllerNull } from 'src/components/ytelser/utils';
import type {
    BeregnetDagDagpengerDto,
    BeregnetDagDagpengerDtoKilde,
    Dagpenger
} from 'src/generated/modiapersonoversikt-api';

/* Takes enum entry for benefit type and source and derives a human readable
 * name. Not as good as a hashmap or maybe a gettext PO based solution, ideally
 * maintained by somebody else, but likely to work reasonably well even if the
 * sets change. */
const prettyEnum = (ytelseType: BeregnetDagDagpengerDtoKilde) =>
    ytelseType
        .replace(/^DAGPENGER_/, '')
        .replace('ARBEIDSSOKER', 'ARBEIDSSØKER')
        .replace('ORDINAER', 'ORDINÆR')
        .toLowerCase()
        .replace('dp_sak', 'DP-sak')
        .replace('_', ' ')
        .replace(/\b./, (initial: string) => initial.toUpperCase());

const rowKey = (ytelse: BeregnetDagDagpengerDto) => ytelse.fraOgMed;

/**
 * Periods may not have an end. periodeEllerNull happens to format this just the
 * way we want.
 */
const rowHeader = (ytelse: BeregnetDagDagpengerDto) =>
    `${periodeEllerNull({
        fra: ytelse.fraOgMed,
        til: ytelse.tilOgMed
    })}`;

const PeriodeContent = ({ periode }: { periode: BeregnetDagDagpengerDto }) => {
    const entries = {
        Kilde: prettyEnum(periode.kilde),
        Sats: periode.sats,
        'Gjenstående dager': periode.gjenståendeDager
    };
    return (
        <Accordion.Content>
            <TitleValuePairsComponent entries={entries} columns={{ xs: 2, md: 3 }} />
        </Accordion.Content>
    );
};

/**
 * More or less stolen from PleiepengerPerioder.
 * Accordion seems like way overkill, but we use it to keep in theme with the
 * rest of the ytelser.
 */
const Perioder = ({ perioder }: { perioder: BeregnetDagDagpengerDto[] }) => (
    <Card paddingBlock="4">
        <Heading as="h4" size="small">
            Perioder
        </Heading>
        <Accordion size="small">
            {perioder.map((periode, i) => {
                return (
                    <Accordion.Item key={rowKey(periode)} defaultOpen={i === 0}>
                        <Accordion.Header>{rowHeader(periode)}</Accordion.Header>
                        <PeriodeContent periode={periode} />
                    </Accordion.Item>
                );
            })}
        </Accordion>
    </Card>
);

export const DagpengerDetails = ({ ytelse }: { ytelse: Dagpenger }) => (
    <VStack gap="space-4" minHeight="0">
        <Card padding="space-16">
            <Heading as="h3" size="small" spacing>
                Om dagpenger
            </Heading>
            <Normaltekst>
                Dataen er basert på beregnede meldeperioder fra både Arena og DP-sak. Sats er inklusiv barnetillegg og
                eventuelt redusert etter samordning. Gjenstående dager er dager med dagpengerettighet etter perioden.
            </Normaltekst>

            <VStack gap="space-4" minHeight="0">
                <Perioder perioder={ytelse.perioder} />
            </VStack>
        </Card>
    </VStack>
);
