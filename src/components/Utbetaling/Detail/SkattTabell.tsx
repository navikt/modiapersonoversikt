import { BodyShort, Box, Heading, HStack, Table } from '@navikt/ds-react';
import type { Ytelse } from 'src/generated/modiapersonoversikt-api';
import { formaterNOK } from 'src/utils/string-utils';

export const SkattTabell = ({ ytelse }: { ytelse: Ytelse }) => {
    if (!ytelse.skattListe || ytelse.skattListe.isEmpty()) return null;
    return (
        <>
            <Box margin="space-8" className="border-ax-border-neutral-subtle border-b-1"></Box>
            <Table size="small">
                <Table.Header>
                    <Table.Row shadeOnHover={false}>
                        <Table.HeaderCell>Skatt</Table.HeaderCell>
                        <Table.HeaderCell align="right">Beløp</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {ytelse.skattListe.map((skatt, i) => {
                        return (
                            <Table.Row key={`${i}-${skatt.skattebelop}`} shadeOnHover={false}>
                                <Table.DataCell scope="row">Skatt</Table.DataCell>
                                <Table.DataCell align="right">{formaterNOK(skatt.skattebelop)}</Table.DataCell>
                            </Table.Row>
                        );
                    })}
                </Table.Body>
            </Table>
            <HStack align="stretch" justify="space-between" padding="space-8">
                <Heading size="xsmall">Total skatt</Heading>
                <BodyShort>{formaterNOK(ytelse.skattsum)}</BodyShort>
            </HStack>
        </>
    );
};
