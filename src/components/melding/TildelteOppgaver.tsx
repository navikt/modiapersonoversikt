import { InformationSquareFillIcon } from '@navikt/aksel-icons';
import { ActionMenu, Alert, BodyShort, Button } from '@navikt/ds-react';
import { useNavigate } from '@tanstack/react-router';
import { useMeldinger, usePersonOppgaver } from 'src/lib/clients/modiapersonoversikt-api';
import type { Temagruppe } from 'src/lib/types/temagruppe';
import { temagruppeTekst } from 'src/models/temagrupper';
import Card from '../Card';
import { meldingstypeTekst } from '../Meldinger/List/tekster';
import { nyesteMelding } from '../Meldinger/List/utils';

export const TildelteOppgaver = () => {
    const { data: oppgaver } = usePersonOppgaver();
    const { data: traader } = useMeldinger();

    const oppgaveItems = oppgaver.map((oppgave) => {
        const traad = traader.find((traad) => traad.traadId === oppgave.traadId);
        if (!traad) {
            const error = new Error(`Kunne ikke finne tråd tilknyttet oppgave: ${oppgave.oppgaveId}`);
            return { ...oppgave, error: error.message };
        }

        const sisteMelding = nyesteMelding(traad);
        const title = `${meldingstypeTekst(sisteMelding.meldingstype)} - ${temagruppeTekst(sisteMelding.temagruppe as Temagruppe)}`;

        return {
            error: null,
            ...oppgave,
            traadId: traad.traadId,
            title
        };
    });
    const navigate = useNavigate();

    const gotoTraad = (traadId: string) => {
        navigate({
            to: '/new/person/meldinger',
            search: {
                traadId
            }
        });
    };

    if (oppgaver.length === 0) return null;

    return (
        <Card flexGrow="0" padding="2">
            <ActionMenu>
                <ActionMenu.Trigger>
                    <Button variant="tertiary" size="small" icon={<InformationSquareFillIcon />}>
                        Du har {oppgaver.length} tildelt oppgave på bruker
                    </Button>
                </ActionMenu.Trigger>
                <ActionMenu.Content>
                    <ActionMenu.Group label="Oppgaver på bruker">
                        {oppgaveItems.map((oppgave) => (
                            <>
                                <ActionMenu.Divider key={`${oppgave.oppgaveId}-divider`} />
                                {oppgave.error !== null ? (
                                    <ActionMenu.Item key={oppgave.oppgaveId} disabled>
                                        <Alert inline variant="warning">
                                            {oppgave.error}
                                        </Alert>
                                    </ActionMenu.Item>
                                ) : (
                                    <ActionMenu.Item
                                        key={oppgave.oppgaveId}
                                        onSelect={() => gotoTraad(oppgave.traadId)}
                                    >
                                        <div>
                                            <BodyShort weight="semibold" size="small">
                                                {oppgave.title}
                                            </BodyShort>
                                            <BodyShort size="small" textColor="subtle">
                                                Oppgave ID: {oppgave.oppgaveId}
                                            </BodyShort>
                                        </div>
                                    </ActionMenu.Item>
                                )}
                            </>
                        ))}
                    </ActionMenu.Group>
                </ActionMenu.Content>
            </ActionMenu>
        </Card>
    );
};
