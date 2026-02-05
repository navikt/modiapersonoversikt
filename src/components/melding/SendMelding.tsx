import { Alert, Button, Heading, HStack, Skeleton } from '@navikt/ds-react';
import { useAtom } from 'jotai';
import { type ReactElement, useCallback, useMemo } from 'react';
import { useTraader } from 'src/components/Meldinger/List/utils';
import { dialogUnderArbeidAtom } from 'src/lib/state/dialog';
import { type Traad, TraadType } from 'src/lib/types/modiapersonoversikt-api';
import Card from '../Card';
import { FortsettDialog } from './FortsettDialog';
import NyMelding from './NyMelding';

export const SendMelding = ({ lukkeKnapp }: { lukkeKnapp?: ReactElement<typeof Button> }) => {
    const { data: traader, isLoading } = useTraader();

    return (
        <>
            {isLoading ? (
                <Skeleton variant="rectangle" height="100%" />
            ) : (
                <SendMeldingContent traader={traader} lukkeKnapp={lukkeKnapp} />
            )}
        </>
    );
};

const SendMeldingContent = ({
    traader,
    lukkeKnapp
}: {
    lukkeKnapp?: ReactElement<typeof Button>;
    traader: Traad[];
}) => {
    const [oppgave, setOppgave] = useAtom(dialogUnderArbeidAtom);
    const traad = useMemo(() => traader.find((m) => m.traadId === oppgave), [traader, oppgave]);

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
                <Heading level="2" size="small">
                    {oppgave ? continueText : 'Ny dialog'}
                </Heading>
                {lukkeKnapp}
            </HStack>
            {oppgave ? (
                traad ? (
                    <FortsettDialog traad={traad} key={traad.traadId} lukkOppgave={cancelOppgave} />
                ) : (
                    <>
                        <Alert variant="warning">Fant ikke dialogen under arbeid</Alert>
                        <HStack justify="end" marginBlock="1">
                            <Button variant="tertiary" size="small" onClick={cancelOppgave}>
                                Avbryt
                            </Button>
                        </HStack>
                    </>
                )
            ) : (
                <NyMelding />
            )}
        </Card>
    );
};
