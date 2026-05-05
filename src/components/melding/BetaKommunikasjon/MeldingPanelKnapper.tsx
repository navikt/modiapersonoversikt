import { NotePencilIcon } from '@navikt/aksel-icons';
import { BodyLong, Button, Dialog, HStack } from '@navikt/ds-react';
import { useAtom } from 'jotai';
import { useRef, useState } from 'react';
import { FeatureToggles } from 'src/components/featureToggle/toggleIDs';
import useFeatureToggle from 'src/components/featureToggle/useFeatureToggle';
import { nyMeldingUnderArbeidAtom, svarUnderArbeidAtom } from 'src/lib/state/dialog';

export const MeldingPanelKnapper = () => {
    const { isOn: isNyKommunikasjonEnabled } = useFeatureToggle(FeatureToggles.NyKommunikasjon);
    const openButtonRef = useRef<HTMLButtonElement | null>(null);
    const [svarUnderArbeid, setSvarUnderArbeid] = useAtom(svarUnderArbeidAtom);
    const [nyMeldingUnderArbeid, setNyMeldingUnderArbeid] = useAtom(nyMeldingUnderArbeidAtom);
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    if (!isNyKommunikasjonEnabled) return null;

    const handleStartNyMelding = () => {
        setSvarUnderArbeid(undefined);
        setNyMeldingUnderArbeid(true);
    };

    return (
        <HStack justify="center" align="center">
            <Button
                ref={openButtonRef}
                disabled={nyMeldingUnderArbeid}
                icon={<NotePencilIcon aria-hidden />}
                className="text-nowrap"
                size="small"
                variant="primary"
                data-color="success"
                onClick={() => {
                    if (svarUnderArbeid !== undefined) {
                        setIsDialogOpen(true);
                        return;
                    }
                    handleStartNyMelding();
                }}
            >
                Skriv ny melding
            </Button>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <Dialog.Popup role="alertdialog" closeOnOutsideClick={false}>
                    <Dialog.Header withClosebutton={true}>
                        <Dialog.Title>Ønsker du å avbryte svar?</Dialog.Title>
                    </Dialog.Header>
                    <Dialog.Body>
                        <BodyLong>Utkast fra svar blir med til ny melding.</BodyLong>
                    </Dialog.Body>
                    <Dialog.Footer>
                        <Dialog.CloseTrigger>
                            <Button size="medium" variant="secondary" data-color="neutral">
                                Nei
                            </Button>
                        </Dialog.CloseTrigger>
                        <Dialog.CloseTrigger>
                            <Button size="medium" onClick={handleStartNyMelding}>
                                Ja
                            </Button>
                        </Dialog.CloseTrigger>
                    </Dialog.Footer>
                </Dialog.Popup>
            </Dialog>
        </HStack>
    );
};
