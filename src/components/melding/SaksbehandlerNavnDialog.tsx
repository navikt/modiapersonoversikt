import { CogIcon } from '@navikt/aksel-icons';
import { Alert, BodyLong, Button, Dialog, HStack, TextField, Tooltip, VStack } from '@navikt/ds-react';
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
    const [visBekreftLukk, setVisBekreftLukk] = useState(false);
    const [opprinneligNavn, setOpprinneligNavn] = useState('');
    const innstillinger = useInnstillinger();
    const saksbehandler = useInnloggetSaksbehandler();
    const oppdaterInnstillinger = useOppdaterInnstillinger();
    const disableDialog = useDisableDialog();

    useEffect(() => {
        if (!open) return;
        const lagretNavn = innstillinger.data?.innstillinger[INNSTILLINGER_KEY_SAKSBEHANDLER_NAVN] ?? '';
        setNavn(lagretNavn);
        setOpprinneligNavn(lagretNavn);
    }, [innstillinger.data, open]);

    const erEndret = navn !== opprinneligNavn;

    const handleOpenChange = (nesteOpen: boolean, event?: Event) => {
        if (!nesteOpen && erEndret) {
            event?.preventDefault();
            setVisBekreftLukk(true);
            return;
        }
        setOpen(nesteOpen);
    };

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
            <Tooltip content="Endre navn som brukes i meldingssignatur">
                <Button
                    type="button"
                    variant="tertiary"
                    size="small"
                    icon={<CogIcon aria-hidden />}
                    aria-label="Endre navn som brukes i meldingssignatur"
                    onClick={() => {
                        setFeil(undefined);
                        setOpen(true);
                    }}
                    disabled={disableDialog || innstillinger.isPending}
                />
            </Tooltip>
            <Dialog open={open} onOpenChange={handleOpenChange}>
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
            <Dialog open={visBekreftLukk} onOpenChange={setVisBekreftLukk}>
                <Dialog.Popup role="alertdialog" closeOnOutsideClick={false}>
                    <Dialog.Header withClosebutton={false}>
                        <Dialog.Title>Er du sikker?</Dialog.Title>
                    </Dialog.Header>
                    <Dialog.Body>
                        <BodyLong>Du har endret navnet uten å lagre. Endringen blir borte hvis du lukker nå.</BodyLong>
                    </Dialog.Body>
                    <Dialog.Footer>
                        <Dialog.CloseTrigger>
                            <Button type="button" variant="secondary" size="medium">
                                Avbryt
                            </Button>
                        </Dialog.CloseTrigger>
                        <Button
                            type="button"
                            variant="danger"
                            size="medium"
                            onClick={() => {
                                setVisBekreftLukk(false);
                                setOpen(false);
                            }}
                        >
                            Forkast endringer
                        </Button>
                    </Dialog.Footer>
                </Dialog.Popup>
            </Dialog>
        </>
    );
}
