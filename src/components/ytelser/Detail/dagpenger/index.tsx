import { Accordion, Heading, VStack } from '@navikt/ds-react';
import Card from 'src/components/Card';
import { TitleValuePairsComponent } from 'src/components/ytelser/Detail';
import { periodeEllerNull } from 'src/components/ytelser/utils';
import type {
    PeriodeDagpengerDto,
    PeriodeDagpengerDtoKilde,
    PeriodeDagpengerDtoYtelseType,
    PseudoDagpengerVedtak
} from 'src/generated/modiapersonoversikt-api';
import { datoEllerTomString, formaterDato } from 'src/utils/string-utils';

/* Takes enum entry for benefit type and source and derives a human readable
 * name. Not as good as a hashmap or maybe a gettext PO based solution, ideally
 * maintained by somebody else, but likely to work reasonably well even if the
 * sets change. */
const prettyEnum = (ytelseType: PeriodeDagpengerDtoKilde | PeriodeDagpengerDtoYtelseType) =>
    ytelseType
        .replace(/^DAGPENGER_/, '')
        .replace('ARBEIDSSOKER', 'ARBEIDSSØKER')
        .replace('ORDINAER', 'ORDINÆR')
        .toLowerCase()
        .replace('dp_sak', 'DP-sak')
        .replace('_', ' ')
        .replace(/\b./, (initial: string) => initial.toUpperCase());

const rowKey = (periode: PeriodeDagpengerDto) => periode.ytelseType + periode.fraOgMedDato;

/**
 * Periods may not have an end. periodeEllerNull happens to format this just the
 * way we want.
 */
const rowHeader = (periode: PeriodeDagpengerDto) =>
    `${prettyEnum(periode.ytelseType)} ${periodeEllerNull({
        fra: periode.fraOgMedDato,
        til: periode.tilOgMedDato
    })}`;

const PeriodeContent = ({ periode }: { periode: PeriodeDagpengerDto }) => {
    const entries = {
        'Fra og med': formaterDato(periode.fraOgMedDato),
        'Til og med': datoEllerTomString(periode.tilOgMedDato),
        Type: prettyEnum(periode.ytelseType),
        Kilde: prettyEnum(periode.kilde)
    };
    return (
        <Accordion.Content>
            <Heading as="h3" size="small">
                Anviste utbetalinger
            </Heading>
            <TitleValuePairsComponent entries={entries} columns={{ xs: 2, lg: 4 }} />
        </Accordion.Content>
    );
};

/**
 * More or less stolen from PleiepengerPerioder.
 * Accordion seems like way overkill, but we use it to keep in theme with the
 * rest of the ytelser.
 */
const Perioder = ({ perioder }: { perioder: PeriodeDagpengerDto[] }) => (
    <Card padding="4">
        <Heading as="h4" size="small">
            Perioder
        </Heading>
        <Accordion size="small" headingSize="xsmall">
            {perioder.map((periode) => {
                return (
                    <Accordion.Item key={rowKey(periode)} defaultOpen>
                        <Accordion.Header>{rowHeader(periode)}</Accordion.Header>
                        <PeriodeContent periode={periode} />
                    </Accordion.Item>
                );
            })}
        </Accordion>
    </Card>
);

export const DagpengerDetails = ({ ytelse }: { ytelse: PseudoDagpengerVedtak }) => (
    <Card padding="4">
        <Heading as="h4" size="small">
            Om dagpenger
        </Heading>
        <VStack gap="1" minHeight="0">
            <Perioder perioder={ytelse.perioder} />
        </VStack>
    </Card>
);
