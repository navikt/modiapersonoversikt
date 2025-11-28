import { Box, Button, Heading, InlineMessage, Table } from '@navikt/ds-react';
import { useState } from 'react';
import { SakDetails } from 'src/components/saker/Detail';
import { getSakId, useFilterSaker } from 'src/components/saker/utils';
import type { Journalpost } from 'src/generated/modiapersonoversikt-api';
import { formaterDato } from 'src/utils/string-utils';
import { twMerge } from 'tailwind-merge';

type Props = {
    journalposter: Journalpost[];
};

const JournalForingSaksDetail = ({ valgtSakId }: { valgtSakId: string }) => {
    const saker = useFilterSaker();
    const valgtSak = saker.find(
        (sak) => getSakId(sak) === valgtSakId || sak.saksid === valgtSakId || sak.fagsaksnummer === valgtSakId
    );

    if (!valgtSak) {
        return (
            <InlineMessage status="error" size="small">
                Saken du valgte, ble ikke funnet.
            </InlineMessage>
        );
    }

    if (valgtSak.harTilgang) {
        return (
            <InlineMessage  status="error">
                Du kan ikke se innholdet i denne saken fordi du ikke har tilgang til tema {valgtSak.temanavn}.
            </InlineMessage>
        );
    }

    return <SakDetails valgtSak={valgtSak} />;
};

export const Journalposter = ({ journalposter }: Props) => {
    const [showAll, setShowAll] = useState(false);

    if (journalposter.length === 0) {
        return null;
    }

    const journalposterToShow = showAll ? journalposter : journalposter.slice(0, 2);

    return (
        <Box.New>
            <Heading level="4" size="xsmall">
                Journalført på {journalposter.length} sak(er)
            </Heading>
            <Box.New paddingInline="4" paddingBlock="2">
                <Table size="small" data-testid="journalposter-table">
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell />
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
                                Journalført dato
                            </Table.HeaderCell>
                            <Table.HeaderCell scope="col" textSize="small">
                                Enhet
                            </Table.HeaderCell>
                            <Table.HeaderCell scope="col" textSize="small">
                                Fagsaksystem
                            </Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {journalposterToShow.map((p) => {
                            const navn = p.journalfortAv?.navn ?? 'ukjent';
                            const dato = formaterDato(p.journalfortDato);
                            const tema = p.journalfortTemanavn;
                            const saksid = p.journalfortSaksid;
                            return (
                                <Table.ExpandableRow
                                    key={`${p.journalfortDato}-${saksid}`}
                                    content={saksid ? <JournalForingSaksDetail valgtSakId={saksid} /> : 'Ukjent saksid'}
                                >
                                    <Table.DataCell textSize="small">{saksid ?? 'Ukjent saksid'}</Table.DataCell>
                                    <Table.DataCell textSize="small">{tema}</Table.DataCell>
                                    <Table.DataCell textSize="small">{navn}</Table.DataCell>
                                    <Table.DataCell textSize="small">{dato}</Table.DataCell>
                                    <Table.DataCell textSize="small">{p.journalforendeEnhet}</Table.DataCell>
                                    <Table.DataCell textSize="small">{p.journalfortFagsaksystem}</Table.DataCell>
                                </Table.ExpandableRow>
                            );
                        })}
                    </Table.Body>
                </Table>
                <Box.New marginBlock="2">
                    <Button
                        variant="secondary"
                        size="xsmall"
                        className={twMerge(journalposter.length <= 2 && 'hidden')}
                        onClick={() => setShowAll((v) => !v)}
                    >
                        {showAll ? 'Skjul' : 'Se alle'}
                    </Button>
                </Box.New>
            </Box.New>
        </Box.New>
    );
};
