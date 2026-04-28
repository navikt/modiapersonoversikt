import { NotePencilIcon } from '@navikt/aksel-icons';
import { Button, HStack } from '@navikt/ds-react';
import { useAtom, useSetAtom } from 'jotai';
import { useRef } from 'react';
import { FeatureToggles } from 'src/components/featureToggle/toggleIDs';
import useFeatureToggle from 'src/components/featureToggle/useFeatureToggle';
import { nyMeldingUnderArbeidAtom, svarUnderArbeidAtom } from 'src/lib/state/dialog';

export const MeldingPanelKnapper = () => {
    const { isOn } = useFeatureToggle(FeatureToggles.NyKommunikasjon);
    const openButtonRef = useRef<HTMLButtonElement | null>(null);
    const setSvarUnderArbeid = useSetAtom(svarUnderArbeidAtom);
    const [nyMeldingUnderArbeid, setNyMeldingUnderArbeid] = useAtom(nyMeldingUnderArbeidAtom);

    if (!isOn) return null;

    return (
        <HStack justify="center" align="center">
            <Button
                ref={openButtonRef}
                disabled={nyMeldingUnderArbeid}
                icon={<NotePencilIcon aria-hidden />}
                className="text-nowrap"
                size="small"
                variant="secondary"
                data-color="success"
                onClick={() => {
                    setSvarUnderArbeid(undefined);
                    setNyMeldingUnderArbeid(true);
                }}
            >
                Skriv ny melding
            </Button>
        </HStack>
    );
};
