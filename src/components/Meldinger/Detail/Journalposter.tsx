import { Box, ReadMore, Table } from '@navikt/ds-react';
import type { Journalpost } from 'src/generated/modiapersonoversikt-api';
import { formaterDato } from 'src/utils/string-utils';

type Props = {
    journalposter: Journalpost[];
};

export const Journalposter = ({ journalposter }: Props) => {
    if (journalposter.length === 0) {
        return null;
    }

    return (
        <ReadMore
            header={`${journalposter.length} ${journalposter.length > 1 ? 'journalføringer' : 'journalføring'}`}
            data-testid="journalposter-readmore"
        >
            <Box paddingInline="4" paddingBlock="2">
                <Table size="small" data-testid="journalposter-table">
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell scope="col" textSize="small">
                                Saks-ID
                            </Table.HeaderCell>
                            <Table.HeaderCell scope="col" textSize="small">
                                Tema
                            </Table.HeaderCell>
                            <Table.HeaderCell scope="col" textSize="small">
                                Journalført av
                            </Table.HeaderCell>
                            <Table.HeaderCell scope="col" textSize="small">
                                Journalført dato
                            </Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {journalposter.map((p) => {
                            const navn = p.journalfortAv?.navn ?? 'ukjent';
                            const dato = formaterDato(p.journalfortDato);
                            const tema = p.journalfortTemanavn;
                            const saksid = p.journalfortSaksid;
                            return (
                                <Table.Row key={`${p.journalfortDato}-${saksid}`}>
                                    <Table.DataCell textSize="small">{saksid ?? 'Ukjent saksid'}</Table.DataCell>
                                    <Table.DataCell textSize="small">{tema}</Table.DataCell>
                                    <Table.DataCell textSize="small">{navn}</Table.DataCell>
                                    <Table.DataCell textSize="small">{dato}</Table.DataCell>
                                </Table.Row>
                            );
                        })}
                    </Table.Body>
                </Table>
            </Box>
        </ReadMore>
    );
};
