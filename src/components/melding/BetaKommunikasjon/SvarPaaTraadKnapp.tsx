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

    const gjeldeneDialogErUnderArbeid = svarUnderArbeid === traad.traadId;
    const kanBesvares = traadKanBesvares(traad);

    const tekstPaaKnapp = gjeldeneDialogErUnderArbeid && openPanel ? 'Under arbeid' : 'Svar';

    return (
        <>
            {kanBesvares && (
                <>
                    <Button
                        size="small"
                        onClick={openDialogEllerSvarPaaTraad}
                        disabled={gjeldeneDialogErUnderArbeid && openPanel}
                        variant="primary"
                        icon={
                            gjeldeneDialogErUnderArbeid && openPanel ? (
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
                                    {svarUnderArbeid
                                        ? 'Ønsker du å svare på annen dialog?'
                                        : 'Ønsker du å svare på dialog?'}
                                </Dialog.Title>
                            </Dialog.Header>
                            <Dialog.Body>
                                <BodyLong>
                                    {svarUnderArbeid ? 'Utkast blir med til nytt svar.' : 'Utkast blir med til svar.'}
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
                                        ja
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
