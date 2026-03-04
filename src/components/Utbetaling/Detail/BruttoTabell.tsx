import { BodyShort, Heading, HStack, Table } from '@navikt/ds-react';
import { formaterNOK } from 'src/components/Utbetaling/utils';
import type { Ytelse } from 'src/generated/modiapersonoversikt-api';

export const BruttoTabell = ({ ytelse }: { ytelse: Ytelse }) => (
    <>
        <Table size="small">
            <Table.Header>
                <Table.Row shadeOnHover={false}>
                    <Table.HeaderCell>Detaljer</Table.HeaderCell>
                    <Table.HeaderCell>Antall</Table.HeaderCell>
                    <Table.HeaderCell align="right">Satsbeløp</Table.HeaderCell>
                    <Table.HeaderCell align="right">Beløp</Table.HeaderCell>
                </Table.Row>
            </Table.Header>
            <Table.Body>
                {ytelse.ytelseskomponentListe.map((komp, i) => {
                    return (
                        <Table.Row key={`${i}-${komp.ytelseskomponenttype}`} shadeOnHover={false}>
                            <Table.DataCell scope="row">{komp.ytelseskomponenttype}</Table.DataCell>
                            <Table.DataCell scope="row">{komp.satsantall}</Table.DataCell>
                            <Table.DataCell align="right">
                                {komp.satsbelop ? formaterNOK(komp.satsbelop) : '-'}
                            </Table.DataCell>
                            <Table.DataCell align="right">{formaterNOK(komp.ytelseskomponentbelop)}</Table.DataCell>
                        </Table.Row>
                    );
                })}
            </Table.Body>
        </Table>
        <HStack align="stretch" justify="space-between" padding="2">
            <Heading size="xsmall">Total brutto</Heading>
            <BodyShort>{formaterNOK(ytelse.ytelseskomponentersum)}</BodyShort>
        </HStack>
    </>
);
