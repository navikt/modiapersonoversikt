import { Alert, Button, HStack, Heading, Skeleton } from '@navikt/ds-react';
import { useAtom } from 'jotai';
import { type ReactElement, Suspense, useCallback, useMemo } from 'react';
import { useMeldinger } from 'src/lib/clients/modiapersonoversikt-api';
import { dialogUnderArbeidAtom } from 'src/lib/state/dialog';
import { TraadType } from 'src/lib/types/modiapersonoversikt-api';
import Card from '../Card';
import ErrorBoundary from '../ErrorBoundary';
import { FortsettDialog } from './FortsettDialog';
import NyMelding from './NyMelding';

type Props = {
    lukkeKnapp?: ReactElement<typeof Button>;
};

export const SendMelding = ({ lukkeKnapp }: Props) => {
    return (
        <ErrorBoundary boundaryName="sendmelding">
            <Suspense fallback={<Skeleton variant="rounded" height="100%" />}>
                <SendMeldingContent lukkeKnapp={lukkeKnapp} />
            </Suspense>
        </ErrorBoundary>
    );
};

const SendMeldingContent = ({ lukkeKnapp }: Props) => {
    const [oppgave, setOppgave] = useAtom(dialogUnderArbeidAtom);
    const { data: meldinger } = useMeldinger();
    const traad = useMemo(() => meldinger.find((m) => m.traadId === oppgave), [meldinger, oppgave]);

    const cancelOppgave = useCallback(() => {
        setOppgave(undefined);
    }, [setOppgave]);

    const continueText = useMemo(
        () => (traad?.traadType === TraadType.SAMTALEREFERAT ? 'Påfølgende referat' : 'Fortsett samtale'),
        [traad]
    );

    return (
        <Card padding="2" as="section" aria-label="Dialogpanel">
            <HStack justify="space-between">
                <Heading level="2" size="medium">
                    {oppgave ? continueText : 'Send ny dialog'}
                </Heading>
                {lukkeKnapp}
            </HStack>
            {oppgave ? (
                <>
                    {traad ? (
                        <FortsettDialog traad={traad} key={traad.traadId} />
                    ) : (
                        <Alert variant="warning">Fant ikke dialogen under arbeid</Alert>
                    )}
                    <HStack justify="center" marginBlock="4">
                        <Button variant="tertiary" size="small" onClick={cancelOppgave}>
                            Avbryt
                        </Button>
                    </HStack>
                </>
            ) : (
                <NyMelding />
            )}
        </Card>
    );
};
