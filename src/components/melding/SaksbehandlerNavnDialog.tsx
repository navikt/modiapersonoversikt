import { CogIcon } from '@navikt/aksel-icons';
import { Alert, Button, Dialog, HStack, TextField, VStack } from '@navikt/ds-react';
import { useEffect, useState } from 'react';
import { useDisableDialog } from 'src/lib/state/dialog';
import innloggetSaksbehandler from 'src/rest/resources/innloggetSaksbehandlerResource';
import innstillingerResource, { INNSTILLINGER_KEY_SAKSBEHANDLER_NAVN } from 'src/rest/resources/innstillingerResource';

export function SaksbehandlerNavnDialog() {
    const [open, setOpen] = useState(false);
    const [navn, setNavn] = useState('');
    const [feil, setFeil] = useState<string>();
    const innstillinger = innstillingerResource.useFetch();
    const saksbehandler = innloggetSaksbehandler.useFetch();
    const oppdaterInnstillinger = innstillingerResource.useMutation();
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
            <Dialog open={open} onOpenChange={setOpen} size="small">
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
                        </VStack>
                    </Dialog.Body>
                    <Dialog.Footer>
                        <HStack gap="space-8" justify="end">
                            <Dialog.CloseTrigger>
                                <Button type="button" variant="secondary">
                                    Avbryt
                                </Button>
                            </Dialog.CloseTrigger>
                            <Button type="button" onClick={lagre} loading={oppdaterInnstillinger.isPending}>
                                Lagre
                            </Button>
                        </HStack>
                    </Dialog.Footer>
                </Dialog.Popup>
            </Dialog>
        </>
    );
}
