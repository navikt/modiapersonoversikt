import { Box, Button, Heading, Table } from '@navikt/ds-react';
import { useState } from 'react';
import { AvsluttOppgaveModal } from 'src/components/Meldinger/AvsluttOppgave';
import { OppgaveContent } from 'src/components/Oppgave/OppgaveContent';
import type { OppgaveDto } from 'src/generated/modiapersonoversikt-api';
import { useGsakTema, usePersonOppgaver } from 'src/lib/clients/modiapersonoversikt-api';
import { datoEllerNull } from 'src/utils/string-utils';
import { twMerge } from 'tailwind-merge';

export const AvsluttOppgave = ({ oppgave }: { oppgave: OppgaveDto }) => {
    const [open, setOpen] = useState(false);

    return (
        <>
            <Button size="small" variant="secondary" onClick={() => setOpen(true)}>
                Avslutt oppgave
            </Button>
            <AvsluttOppgaveModal oppgave={oppgave} open={open} onClose={() => setOpen(false)} />
        </>
    );
};

export const TraadOppgaver = ({ traadId, valgtOppgaveId }: { traadId: string; valgtOppgaveId?: string }) => {
    const [showAll, setShowAll] = useState(false);
    const { data: oppgaver } = usePersonOppgaver();
    const { data: gsakTema } = useGsakTema();

    const traadOppgaver = oppgaver?.filter((oppagve: OppgaveDto) => oppagve.traadId === traadId);

    if (traadOppgaver.length === 0) {
        return null;
    }

    const traadOppgaverToShow = showAll || valgtOppgaveId ? traadOppgaver : traadOppgaver.slice(0, 3);

    return (
        <Box.New>
            <Heading level="4" size="xsmall">
                Oppgaver
            </Heading>
            <Box.New paddingInline="4" paddingBlock="2">
                <Table size="small" data-testid="journalposter-table">
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell />
                            <Table.HeaderCell scope="col" textSize="small">
                                Oppgave-Id
                            </Table.HeaderCell>
                            <Table.HeaderCell scope="col" textSize="small">
                                Oppgave type
                            </Table.HeaderCell>
                            <Table.HeaderCell scope="col" textSize="small">
                                Tema
                            </Table.HeaderCell>
                            <Table.HeaderCell scope="col" textSize="small">
                                Prioritering
                            </Table.HeaderCell>
                            <Table.HeaderCell scope="col" textSize="small">
                                Frist
                            </Table.HeaderCell>
                            <Table.HeaderCell />
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {traadOppgaverToShow.map((p) => {
                            const tema = gsakTema.find((item) => item.kode === p.tema);
                            const oppgaveTyper = tema?.oppgavetyper ?? [];
                            const oppgavetype = oppgaveTyper.find((o) => o.kode === p.oppgavetype);
                            const prioritering = tema?.prioriteter.find((o) => o.kode === p.prioritet);
                            return (
                                <Table.ExpandableRow
                                    key={`${p.oppgaveId}`}
                                    content={<OppgaveContent oppgave={p} />}
                                    selected={p.oppgaveId === valgtOppgaveId}
                                >
                                    <Table.DataCell textSize="small">{p.oppgaveId}</Table.DataCell>
                                    <Table.DataCell textSize="small">
                                        {oppgavetype?.tekst ?? 'Ukjent oppgavetype'}
                                    </Table.DataCell>
                                    <Table.DataCell textSize="small">{tema?.tekst ?? 'Ukjent tema'}</Table.DataCell>
                                    <Table.DataCell textSize="small">{prioritering?.tekst ?? ''}</Table.DataCell>
                                    <Table.DataCell textSize="small">
                                        {datoEllerNull(p?.fristFerdigstillelse)}
                                    </Table.DataCell>
                                    <Table.DataCell textSize="small">
                                        <AvsluttOppgave oppgave={p} />
                                    </Table.DataCell>
                                </Table.ExpandableRow>
                            );
                        })}
                    </Table.Body>
                </Table>
                <Box.New marginBlock="2">
                    <Button
                        variant="secondary"
                        size="xsmall"
                        className={twMerge(traadOppgaver.length <= 3 && 'hidden')}
                        onClick={() => setShowAll((v) => !v)}
                    >
                        {showAll ? 'Skjul' : 'Se alle'}
                    </Button>
                </Box.New>
            </Box.New>
        </Box.New>
    );
};
