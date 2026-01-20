import { ExternalLinkIcon } from '@navikt/aksel-icons';
import { Box, HStack, ReadMore, Table } from '@navikt/ds-react';
import { Link } from '@tanstack/react-router';
import type { OppgaveDto } from 'src/generated/modiapersonoversikt-api';
import { useGsakTema, usePersonOppgaver } from 'src/lib/clients/modiapersonoversikt-api';
import { datoEllerNull } from 'src/utils/string-utils';

export const TraadOppgaver = ({ traadId }: { traadId: string }) => {
    const { data: oppgaver } = usePersonOppgaver();
    const { data: gsakTema } = useGsakTema();

    const traadOppgaver = oppgaver?.filter((oppagve: OppgaveDto) => oppagve.traadId === traadId);

    if (traadOppgaver.length === 0) {
        return null;
    }

    const flertall = traadOppgaver.length > 1;

    return (
        <ReadMore header={`${traadOppgaver.length} ${flertall ? 'åpne' : 'åpen'} oppgave${flertall ? 'r' : ''}`}>
            <Box.New paddingInline="4" paddingBlock="2">
                <Table size="small" data-testid="oppgaver-table">
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell scope="col" textSize="small">
                                Oppgave-ID
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
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {traadOppgaver.map((p) => {
                            const tema = gsakTema.find((item) => item.kode === p.tema);
                            const oppgaveTyper = tema?.oppgavetyper ?? [];
                            const oppgavetype = oppgaveTyper.find((o) => o.kode === p.oppgavetype);
                            const prioritering = tema?.prioriteter.find((o) => o.kode === p.prioritet);
                            return (
                                <Table.Row key={p.oppgaveId}>
                                    <Table.DataCell textSize="small">
                                        <Link
                                            to="/new/person/oppgaver"
                                            className="aksel-link"
                                            search={{ id: `Oppgave${p.oppgaveId}` }}
                                        >
                                            <HStack gap="1" align="center">
                                                <ExternalLinkIcon aria-hidden fontSize="1rem" />{' '}
                                                <span>{p.oppgaveId}</span>
                                            </HStack>
                                        </Link>
                                    </Table.DataCell>
                                    <Table.DataCell textSize="small">
                                        {oppgavetype?.tekst ?? 'Ukjent oppgavetype'}
                                    </Table.DataCell>
                                    <Table.DataCell textSize="small">{tema?.tekst ?? 'Ukjent tema'}</Table.DataCell>
                                    <Table.DataCell textSize="small">{prioritering?.tekst ?? ''}</Table.DataCell>
                                    <Table.DataCell textSize="small">
                                        {datoEllerNull(p?.fristFerdigstillelse)}
                                    </Table.DataCell>
                                </Table.Row>
                            );
                        })}
                    </Table.Body>
                </Table>
            </Box.New>
        </ReadMore>
    );
};
