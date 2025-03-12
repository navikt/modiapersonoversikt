import { Box, Button, Heading, Table } from '@navikt/ds-react';
import { useState } from 'react';
import type { Journalpost } from 'src/generated/modiapersonoversikt-api';
import { formaterDato } from 'src/utils/string-utils';
import { twMerge } from 'tailwind-merge';

type Props = {
    journalposter: Journalpost[];
};

export const Journalposter = ({ journalposter }: Props) => {
    const [showAll, setShowAll] = useState(false);

    if (journalposter.length === 0) {
        return null;
    }

    const journalposterToShow = showAll ? journalposter : journalposter.slice(0, 3);

    return (
        <Box.New>
            <Heading level="4" size="xsmall">
                Journalført på {journalposter.length} sak(er)
            </Heading>
            <Box.New paddingInline="4" paddingBlock="2">
                <Table size="small" data-testid="journalposter-table">
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell scope="col" textSize="small">
                                Saks-Id
                            </Table.HeaderCell>
                            <Table.HeaderCell scope="col" textSize="small">
                                Tema
                            </Table.HeaderCell>
                            <Table.HeaderCell scope="col" textSize="small">
                                Journalført av
                            </Table.HeaderCell>
                            <Table.HeaderCell scope="col" textSize="small">
                                Dato
                            </Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {journalposterToShow.map((p) => {
                            const navn = p.journalfortAv?.navn ?? 'ukjent';
                            const dato = formaterDato(p.journalfortDato);
                            const tema = p.journalfortTemanavn;
                            const saksid = p.journalfortSaksid ? p.journalfortSaksid : 'ukjent saksid';
                            return (
                                <Table.Row key={`${p.journalfortDato}-${p.journalfortSaksid}`}>
                                    <Table.DataCell textSize="small">{saksid}</Table.DataCell>
                                    <Table.DataCell textSize="small">{tema}</Table.DataCell>
                                    <Table.DataCell textSize="small">{navn}</Table.DataCell>
                                    <Table.DataCell textSize="small">{dato}</Table.DataCell>
                                </Table.Row>
                            );
                        })}
                    </Table.Body>
                </Table>
                <Box.New marginBlock="2">
                    <Button
                        variant="secondary"
                        size="xsmall"
                        className={twMerge(journalposter.length <= 3 && 'hidden')}
                        onClick={() => setShowAll((v) => !v)}
                    >
                        {showAll ? 'Skjul' : 'Se alle'}
                    </Button>
                </Box.New>
            </Box.New>
        </Box.New>
    );
};
