import { XMarkIcon } from '@navikt/aksel-icons';
import { Alert, Button, Heading, HStack, InlineMessage, Skeleton, VStack } from '@navikt/ds-react';
import { useAtom, useAtomValue } from 'jotai';
import { useEffect, useMemo, useState } from 'react';
import { traadTypeTekst } from 'src/components/Meldinger/List/tekster';
import { nyesteMelding, useTraader } from 'src/components/Meldinger/List/utils';
import { dialogFeilMeldingAtom, dialogSuksessMeldingAtom } from 'src/components/melding/MeldingPanel';
import { useMeldinger, usePersonData } from 'src/lib/clients/modiapersonoversikt-api';
import { aktivBrukerAtom } from 'src/lib/state/context';
import { overskridKontaktReservasjonAtom, svarUnderArbeidAtom } from 'src/lib/state/dialog';
import { type Traad, type TraadDto, TraadType } from 'src/lib/types/modiapersonoversikt-api';
import { type Temagruppe, temagruppeTekst } from 'src/lib/types/temagruppe';
import { trackGenereltUmamiEvent, trackingEvents } from 'src/utils/analytics';
import { formatterDato } from 'src/utils/date-utils';
import Card from '../Card';
import { FortsettDialog } from './FortsettDialog';
import NyMelding from './NyMelding';

export const SendMelding = () => {
    const { data: traader, isLoading } = useTraader();

    return <>{isLoading ? <Skeleton variant="rectangle" height="100%" /> : <SendMeldingContent traader={traader} />}</>;
};

const ReservertIKRR = () => {
    const { data } = usePersonData();
    const reservertIKRR = !!data?.person.kontaktInformasjon?.erReservert?.value;
    const [overskridReservasjon, setOverskridReservasjon] = useAtom(overskridKontaktReservasjonAtom);

    const aktivBruker = useAtomValue(aktivBrukerAtom);

    useEffect(() => {
        setOverskridReservasjon(false);
    }, [aktivBruker]);

    if (!reservertIKRR) return null;
    return (
        <InlineMessage size="small" status="error" className="mb-4">
            Bruker er reservert fra digital utsendelse, og skal ikke kontaktes via dialogen i Modia personoversikt.
            {!overskridReservasjon && (
                <button
                    type="button"
                    className="aksel-link text-ax-text-danger cursor-pointer"
                    onClick={() => setOverskridReservasjon((prev) => !prev)}
                >
                    Overskrid
                </button>
            )}
        </InlineMessage>
    );
};

const meldingsHeader = (traad?: TraadDto) => {
    if (!traad) return <span>Ny melding</span>;

    const sisteMelding = nyesteMelding(traad);
    const dato = sisteMelding?.ferdigstiltDato || traad.opprettetDato;
    const datoTekst = dato ? formatterDato(dato) : '';

    const svarFortsett = traad?.traadType === TraadType.SAMTALEREFERAT ? 'Fortsett på' : 'Svar til';
    const continueText = `${traadTypeTekst(false, traad.traadType)}- ${traad?.temagruppe ? temagruppeTekst(traad?.temagruppe as Temagruppe) : ''} ${datoTekst}`;

    return (
        <VStack>
            <span className="font-light text-[1rem]">{svarFortsett}</span>
            <span>{continueText}</span>
        </VStack>
    );
};

const SendMeldingContent = ({ traader }: { traader: Traad[] }) => {
    const [dialogUnderArbeid, setDialogUnderArbeid] = useAtom(svarUnderArbeidAtom);
    const traad = useMemo(() => traader.find((m) => m.traadId === dialogUnderArbeid), [traader, dialogUnderArbeid]);
    const [meldingsTittel, setMeldingsTittel] = useState(meldingsHeader(traad));
    const [suksessMelding, setSuksessMelding] = useAtom(dialogSuksessMeldingAtom);
    const [feilMelding, setFeilMelding] = useAtom(dialogFeilMeldingAtom);

    const { isPending } = useMeldinger();

    const feedbackMelding = suksessMelding || feilMelding;

    useEffect(() => {
        if (!feedbackMelding || isPending || feilMelding) return;
        const timer = setTimeout(() => {
            setSuksessMelding(null);
        }, 2000);
        return () => clearTimeout(timer);
    }, [feedbackMelding, isPending, feilMelding, setSuksessMelding]);

    useEffect(() => {
        if (feedbackMelding) return;
        setMeldingsTittel(meldingsHeader(traad));
    }, [traad, feedbackMelding]);

    const lukkFeedback = () => {
        setSuksessMelding(null);
        setFeilMelding(null);
    };

    const feilMeldingComp = feilMelding ? <Alert variant="error">{feilMelding}</Alert> : null;
    const suksessMeldingComp = suksessMelding ? <Alert variant="success">{suksessMelding}</Alert> : null;
    return (
        <Card padding="space-8" as="section" aria-label="Dialogpanel">
            <HStack justify="space-between" align="start" className="mb-4">
                <Heading level="2" size="small">
                    {meldingsTittel}
                </Heading>
                {feilMelding && (
                    <Button
                        variant="tertiary"
                        size="small"
                        icon={<XMarkIcon aria-hidden />}
                        title="Lukk meldingspanel"
                        onClick={lukkFeedback}
                    />
                )}
            </HStack>
            <ReservertIKRR />
            {feedbackMelding ? (
                <Card padding="space-8" as="section" aria-label="Dialogpanel">
                    <VStack gap="space-4">
                        {suksessMeldingComp}
                        {feilMeldingComp}
                    </VStack>
                </Card>
            ) : dialogUnderArbeid ? (
                traad ? (
                    <FortsettDialog traad={traad} key={traad.traadId} />
                ) : (
                    <>
                        <Alert variant="warning">Fant ikke dialogen under arbeid</Alert>
                        <HStack justify="end" marginBlock="space-4">
                            <Button
                                variant="secondary"
                                data-color="danger"
                                size="small"
                                title="Lukk meldingspanel"
                                onClick={() => {
                                    setDialogUnderArbeid(undefined);
                                    trackGenereltUmamiEvent(trackingEvents.avbrytMelding);
                                }}
                            >
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
