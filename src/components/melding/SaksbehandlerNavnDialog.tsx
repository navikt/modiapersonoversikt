import { CogIcon } from '@navikt/aksel-icons';
import { Alert, Button, Dialog, HStack, TextField, VStack } from '@navikt/ds-react';
import { useEffect, useState } from 'react';
import {
    INNSTILLINGER_KEY_SAKSBEHANDLER_NAVN,
    useInnstillinger,
    useOppdaterInnstillinger
} from 'src/lib/clients/innstillinger';
import { useInnloggetSaksbehandler } from 'src/lib/clients/modiapersonoversikt-api';
import { useDisableDialog } from 'src/lib/state/dialog';
import { trackGenereltUmamiEvent, trackingEvents } from 'src/utils/analytics';

export function SaksbehandlerNavnDialog() {
    const [open, setOpen] = useState(false);
    const [navn, setNavn] = useState('');
    const [feil, setFeil] = useState<string>();
    const innstillinger = useInnstillinger();
    const saksbehandler = useInnloggetSaksbehandler();
    const oppdaterInnstillinger = useOppdaterInnstillinger();
    const disableDialog = useDisableDialog();

    useEffect(() => {
        if (!open) return;
        setNavn(innstillinger.data?.innstillinger[INNSTILLINGER_KEY_SAKSBEHANDLER_NAVN] ?? '');
    }, [innstillinger.data, open]);

    const lagre = async () => {
        if (!innstillinger.data) {
            setFeil('Innstillingene er ikke lastet inn ennå.');
            return;
        }

        try {
            await oppdaterInnstillinger.mutateAsync({
                ...innstillinger.data.innstillinger,
                [INNSTILLINGER_KEY_SAKSBEHANDLER_NAVN]: navn.trim()
            });
            trackGenereltUmamiEvent(trackingEvents.signaturnavnEndret);
            setOpen(false);
        } catch {
            setFeil('Kunne ikke lagre navnet. Prøv igjen.');
        }
    };

    return (
        <>
            <Button
                type="button"
                variant="tertiary"
                size="small"
                icon={<CogIcon aria-hidden />}
                aria-label="Åpne innstillinger for signatur"
                onClick={() => {
                    setFeil(undefined);
                    setOpen(true);
                }}
                disabled={disableDialog || innstillinger.isPending}
            />
            <Dialog open={open} onOpenChange={setOpen}>
                <Dialog.Popup>
                    <Dialog.Header>
                        <Dialog.Title>Navn i signatur</Dialog.Title>
                        <Dialog.Description>
                            Velg navnet som skal brukes når du setter inn en signatur i en melding.
                        </Dialog.Description>
                    </Dialog.Header>
                    <Dialog.Body>
                        <VStack gap="space-16">
                            {innstillinger.isError && (
                                <Alert variant="error">Kunne ikke laste inn navneinnstillingen. Prøv igjen.</Alert>
                            )}
                            {feil && <Alert variant="error">{feil}</Alert>}
                            <TextField
                                label="Navn"
                                description={`La feltet stå tomt for å bruke ${saksbehandler.data?.navn ?? 'innlogget saksbehandlers navn'}.`}
                                value={navn}
                                onChange={(event) => setNavn(event.target.value)}
                                autoFocus
                            />
                            <HStack justify="end">
                                <Button
                                    type="button"
                                    variant="tertiary"
                                    size="small"
                                    onClick={() => setNavn('')}
                                    disabled={navn.length === 0}
                                >
                                    Nullstill
                                </Button>
                            </HStack>
                        </VStack>
                    </Dialog.Body>
                    <Dialog.Footer>
                        <HStack gap="space-8" justify="end">
                            <Dialog.CloseTrigger>
                                <Button type="button" variant="secondary" size="small">
                                    Avbryt
                                </Button>
                            </Dialog.CloseTrigger>
                            <Button
                                type="button"
                                onClick={lagre}
                                loading={oppdaterInnstillinger.isPending}
                                size="small"
                            >
                                Lagre
                            </Button>
                        </HStack>
                    </Dialog.Footer>
                </Dialog.Popup>
            </Dialog>
        </>
    );
}
