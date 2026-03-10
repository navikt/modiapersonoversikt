import { ExternalLinkIcon } from '@navikt/aksel-icons';
import {
    Alert,
    Button,
    Checkbox,
    HStack,
    InlineMessage,
    Link,
    Modal,
    Select,
    Skeleton,
    VStack
} from '@navikt/ds-react';
import { useAtomValue } from 'jotai';
import { Suspense, useCallback, useState } from 'react';
import { AlertBanner } from 'src/components/AlertBanner';
import ErrorBoundary from 'src/components/ErrorBoundary';
import {
    useAvsluttDialogMutation,
    useMarkerFeilsendtMutation,
    useSendTilSladdingMutation,
    useSladdeAarsaker
} from 'src/lib/clients/modiapersonoversikt-api';
import { aktivEnhetAtom, usePersonAtomValue } from 'src/lib/state/context';
import type { Traad } from 'src/lib/types/modiapersonoversikt-api';
import { trackGenereltUmamiEvent, trackingEvents } from 'src/utils/analytics';
import { Meldinger } from './Detail/Meldinger';
import { erMeldingFeilsendt } from './List/utils';

function getMeldingerForMerking(traad: Traad) {
    return traad.meldinger.filter((melding) => !erMeldingFeilsendt(melding)).map((melding) => melding.id);
}

type ModalProps = {
    traad: Traad;
    open: boolean;
    onClose: () => void;
};

export const AvsluttDialogModal = ({ traad, open, onClose }: ModalProps) => {
    const enhetId = useAtomValue(aktivEnhetAtom);
    const fnr = usePersonAtomValue();
    const { mutate, isPending } = useAvsluttDialogMutation();

    const avsluttDialog = useCallback(() => {
        trackGenereltUmamiEvent(trackingEvents.merkDialog, { tekst: 'lukk' });
        mutate(
            {
                body: {
                    fnr,
                    traadId: traad.traadId,
                    saksbehandlerValgtEnhet: enhetId as string
                }
            },
            {
                onSettled: () => {
                    onClose();
                }
            }
        );
    }, [fnr, mutate, traad, enhetId, onClose]);

    return (
        <Modal
            open={open}
            onClose={onClose}
            header={{
                heading: 'Avslutt dialog',
                size: 'small',
                closeButton: false
            }}
            width="small"
            size="small"
        >
            <Modal.Body>
                <InlineMessage status="warning">
                    Ved avslutting blir dialogen låst og oppgave ferdigstilt. Det er ikke mulig å sende flere meldinger
                    i denne dialogen i ettertid.
                </InlineMessage>
            </Modal.Body>
            <Modal.Footer>
                <Button type="button" variant="primary" onClick={avsluttDialog} loading={isPending} size="small">
                    Avslutt
                </Button>
                <Button type="button" variant="secondary" onClick={onClose} size="small">
                    Avbryt
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export const MarkerFeilsendtModal = ({ traad, open, onClose }: ModalProps) => {
    const fnr = usePersonAtomValue();
    const { mutate, isPending } = useMarkerFeilsendtMutation();

    const merkFeilsendt = useCallback(() => {
        trackGenereltUmamiEvent(trackingEvents.merkDialog, { tekst: 'feilsendt' });
        if (!traad) {
            onClose();
            return;
        }

        mutate(
            {
                body: { fnr, behandlingsidListe: getMeldingerForMerking(traad) }
            },
            {
                onSettled: () => {
                    onClose();
                }
            }
        );
    }, [mutate, fnr, traad, onClose]);

    return (
        <Modal
            open={open}
            onClose={onClose}
            header={{
                heading: 'Marker som feilsendt',
                size: 'small',
                closeButton: false
            }}
            width="small"
            size="small"
        >
            <Modal.Footer>
                <Button type="button" variant="primary" onClick={merkFeilsendt} loading={isPending} size="small">
                    Marker som feilsendt
                </Button>
                <Button type="button" variant="secondary" onClick={onClose} size="small">
                    Avbryt
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

const SladdeAarsaker = ({ traadId }: { traadId: string }) => {
    const { data: sladdAarsaker, errorMessages, isPending } = useSladdeAarsaker(traadId);

    if (isPending) {
        return <Skeleton variant="text" width="200px" />;
    }
    if (errorMessages.length > 0) return <AlertBanner alerts={errorMessages} />;

    return sladdAarsaker.map((opt) => (
        <option key={opt} value={opt}>
            {opt}
        </option>
    ));
};

export const SladdTraadModal = ({ traad, onClose, open }: ModalProps) => {
    const fnr = usePersonAtomValue();
    const [selected, setSelected] = useState<string[]>([]);
    const [aarsak, setAarsak] = useState('');

    const toggleMelding = (id: string) => {
        setSelected((list) => (list.includes(id) ? list.filter((m) => m !== id) : [...list, id]));
    };

    const { mutate, isPending } = useSendTilSladdingMutation();

    if (!traad) {
        return;
    }
    const submit = () => {
        trackGenereltUmamiEvent(trackingEvents.merkDialog, { tekst: 'sladding' });
        mutate(
            {
                body: {
                    fnr,
                    traadId: traad.traadId,
                    arsak: aarsak,
                    meldingId: selected
                }
            },
            {
                onSettled: () => {
                    onClose();
                }
            }
        );
    };

    return (
        <Modal width="medium" open={open} onClose={onClose} header={{ heading: 'Send til sladding' }}>
            <Modal.Body>
                <VStack gap="2">
                    <Suspense fallback={<Skeleton variant="rectangle" height="16" />}>
                        <ErrorBoundary boundaryName="sladding">
                            <Select
                                label="Velg årsak"
                                size="small"
                                value={aarsak}
                                onChange={(e) => setAarsak(e.target.value)}
                            >
                                <option disabled value="">
                                    Velg årsak
                                </option>
                                <SladdeAarsaker traadId={traad.traadId} />
                            </Select>
                        </ErrorBoundary>
                    </Suspense>
                    <Checkbox
                        checked={selected.length === traad.meldinger.length}
                        indeterminate={selected.length > 0 && selected.length !== traad.meldinger.length}
                        onChange={() => {
                            selected.length === traad.meldinger.length
                                ? setSelected([])
                                : setSelected(traad.meldinger.map((m) => m.id));
                        }}
                    >
                        Velg alle
                    </Checkbox>
                    <VStack maxHeight="60vh" minHeight="0">
                        <Meldinger
                            meldinger={traad.meldinger}
                            wrapper={({ children, melding }) => (
                                <Checkbox
                                    checked={selected.includes(melding.id)}
                                    width="100%"
                                    onChange={() => toggleMelding(melding.id)}
                                >
                                    {children}
                                </Checkbox>
                            )}
                        />
                    </VStack>

                    <Alert variant="warning" size="small">
                        Sak om feilregistrering/sladding må meldes i{' '}
                        <Link
                            href="https://jira.adeo.no/plugins/servlet/desk/portal/541/create/1481"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            porten
                            <ExternalLinkIcon aria-hidden />
                        </Link>
                        .
                    </Alert>
                    <HStack justify="end" gap="4">
                        <Button variant="secondary" onClick={onClose} size="small">
                            Avbryt
                        </Button>
                        <Button onClick={submit} loading={isPending} size="small">
                            Send til sladding
                        </Button>
                    </HStack>
                </VStack>
            </Modal.Body>
        </Modal>
    );
};
