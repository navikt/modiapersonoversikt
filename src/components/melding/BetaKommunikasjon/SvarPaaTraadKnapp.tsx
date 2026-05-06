import { ArrowUndoIcon, PencilIcon } from '@navikt/aksel-icons';
import { BodyLong, Button, Dialog } from '@navikt/ds-react';
import { useAtom, useAtomValue, useSetAtom } from 'jotai';
import { useState } from 'react';
import { traadKanBesvares } from 'src/components/Meldinger/List/utils';

import { meldingPanelIsOpenAtom, nyMeldingUnderArbeidAtom, svarUnderArbeidAtom } from 'src/lib/state/dialog';
import type { Traad } from 'src/lib/types/modiapersonoversikt-api';

export const SvarPaaTraadKnapp = ({ traad }: { traad: Traad }) => {
    const openPanel = useAtomValue(meldingPanelIsOpenAtom);
    const [svarUnderArbeid, setSvarUnderArbeid] = useAtom(svarUnderArbeidAtom);
    const setNyMeldingUnderArbeid = useSetAtom(nyMeldingUnderArbeidAtom);
    const [isAvbrytDialogOpen, setIsAvbrytDialogOpen] = useState(false);

    const openDialogEllerSvarPaaTraad = () => {
        if (openPanel) {
            setIsAvbrytDialogOpen(true);
            return;
        }
        svarSamtale();
    };

    const svarSamtale = () => {
        setSvarUnderArbeid(traad.traadId);
        setNyMeldingUnderArbeid(false);
    };

    const gjeldendeDialogErUnderArbeid = svarUnderArbeid === traad.traadId;
    const kanBesvares = traadKanBesvares(traad);

    const tekstPaaKnapp = gjeldendeDialogErUnderArbeid && openPanel ? 'Under arbeid' : 'Svar';

    return (
        <>
            {kanBesvares && (
                <>
                    <Button
                        size="small"
                        onClick={openDialogEllerSvarPaaTraad}
                        disabled={gjeldendeDialogErUnderArbeid && openPanel}
                        variant="primary"
                        icon={
                            gjeldendeDialogErUnderArbeid && openPanel ? (
                                <PencilIcon aria-hidden />
                            ) : (
                                <ArrowUndoIcon aria-hidden />
                            )
                        }
                    >
                        {tekstPaaKnapp}
                    </Button>
                    <Dialog open={isAvbrytDialogOpen} onOpenChange={setIsAvbrytDialogOpen}>
                        <Dialog.Popup role="alertdialog" closeOnOutsideClick={false}>
                            <Dialog.Header withClosebutton={true}>
                                <Dialog.Title>
                                    {svarUnderArbeid ? 'Ønsker du å avbryte "svar"?' : 'Vil du avbryte “Ny melding?”'}
                                </Dialog.Title>
                            </Dialog.Header>
                            <Dialog.Body>
                                <BodyLong>
                                    {svarUnderArbeid
                                        ? 'Du starter på et nytt svar, og utkastet ditt vil kopieres'
                                        : 'Du starter på et svar, og utkastet ditt vil kopieres'}
                                </BodyLong>
                            </Dialog.Body>
                            <Dialog.Footer>
                                <Dialog.CloseTrigger>
                                    <Button size="medium" variant="secondary" data-color="neutral">
                                        Nei
                                    </Button>
                                </Dialog.CloseTrigger>
                                <Dialog.CloseTrigger>
                                    <Button size="medium" onClick={svarSamtale}>
                                        Ja
                                    </Button>
                                </Dialog.CloseTrigger>
                            </Dialog.Footer>
                        </Dialog.Popup>
                    </Dialog>
                </>
            )}
        </>
    );
};
