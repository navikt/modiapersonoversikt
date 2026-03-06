import { BodyShort, Box, Heading, HStack, Table } from '@navikt/ds-react';
import { formaterNOK } from 'src/components/Utbetaling/utils';
import type { Ytelse } from 'src/generated/modiapersonoversikt-api';

export const TrekkTabell = ({ ytelse }: { ytelse: Ytelse }) => {
    if (!ytelse.trekkListe || ytelse.trekkListe?.isEmpty()) return null;
    return (
        <>
            <Box.New margin="2" className="border-ax-border-neutral-subtle border-b-1"></Box.New>
            <Table size="small">
                <Table.Header>
                    <Table.Row shadeOnHover={false}>
                        <Table.HeaderCell>Trekk</Table.HeaderCell>
                        <Table.HeaderCell align="right">Beløp</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {ytelse.trekkListe?.map((trekk, i) => {
                        return (
                            <Table.Row key={`${trekk.trekktype}-${i}`} shadeOnHover={false}>
                                <Table.DataCell scope="row">{trekk.trekktype}</Table.DataCell>
                                <Table.DataCell align="right">{formaterNOK(trekk.trekkbelop)}</Table.DataCell>
                            </Table.Row>
                        );
                    })}
                </Table.Body>
            </Table>
            <HStack align="stretch" justify="space-between" padding="2">
                <Heading size="xsmall">Totalt trekk</Heading>
                <BodyShort>{formaterNOK(ytelse.trekksum)}</BodyShort>
            </HStack>
        </>
    );
};
