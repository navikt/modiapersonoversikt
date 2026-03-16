import { Alert, Button, Heading, HStack, InlineMessage, Skeleton, VStack } from '@navikt/ds-react';
import { useAtom } from 'jotai';
import { type ReactElement, useCallback, useMemo } from 'react';
import { useTraader } from 'src/components/Meldinger/List/utils';
import { usePersonData } from 'src/lib/clients/modiapersonoversikt-api';
import { dialogUnderArbeidAtom, overskridKontaktReservasjonAtom } from 'src/lib/state/dialog';
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

const ReservertIKRR = () => {
    const { data } = usePersonData();
    const reservertIKRR = !!data?.person.kontaktInformasjon?.erReservert?.value;
    const [overskridReservasjon, setOverskridReservasjon] = useAtom(overskridKontaktReservasjonAtom);
    if (!reservertIKRR) return null;
    return (
        <InlineMessage size="small" status="error">
            Bruker er reservert fra digital utsendelse, og skal ikke kontaktes via dialogen i Modia personoversikt.
            {!overskridReservasjon && (
                <button
                    type="button"
                    className="aksel-link text-ax-text-danger"
                    onClick={() => setOverskridReservasjon(!overskridReservasjon)}
                >
                    Overskrid
                </button>
            )}
        </InlineMessage>
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
            <VStack gap="4">
                <HStack justify="space-between">
                    <Heading level="2" size="small">
                        {oppgave ? continueText : 'Ny dialog'}
                    </Heading>
                    {lukkeKnapp}
                </HStack>
                <ReservertIKRR />
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
            </VStack>
        </Card>
    );
};
