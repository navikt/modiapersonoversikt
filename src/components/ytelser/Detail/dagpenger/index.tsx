import { Heading, Table, VStack } from '@navikt/ds-react';
import { Normaltekst } from 'nav-frontend-typografi';
import Card from 'src/components/Card';
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

const rowHeader = (ytelse: BeregnetDagDagpengerDto) =>
    `${periodeEllerNull({
        fra: ytelse.fraOgMed,
        til: ytelse.tilOgMed
    })}`;

const Perioder = ({ perioder }: { perioder: BeregnetDagDagpengerDto[] }) => (
    <Card paddingBlock="space-16">
        <VStack gap="space-4">
            <Heading as="h4" size="small">
                Perioder
            </Heading>
            <div className="overflow-x-auto">
                <Table size="small" zebraStripes aria-label="Perioder">
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell scope="col">Periode</Table.HeaderCell>
                            <Table.HeaderCell scope="col">Kilde</Table.HeaderCell>
                            <Table.HeaderCell scope="col" align="right">
                                Sats
                            </Table.HeaderCell>
                            <Table.HeaderCell scope="col" align="right">
                                Gjenstående dager
                            </Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {perioder.map((periode, index) => (
                            <Table.Row key={`${periode.fraOgMed}-${periode.kilde}-${index}`}>
                                <Table.DataCell>{rowHeader(periode)}</Table.DataCell>
                                <Table.DataCell>{prettyEnum(periode.kilde)}</Table.DataCell>
                                <Table.DataCell align="right">{periode.sats}</Table.DataCell>
                                <Table.DataCell align="right">{periode.gjenståendeDager}</Table.DataCell>
                            </Table.Row>
                        ))}
                    </Table.Body>
                </Table>
            </div>
        </VStack>
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
