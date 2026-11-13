import { useNavigate } from '@tanstack/react-router';
import { useAtom, useAtomValue, useSetAtom } from 'jotai';
import useDeaktiverGammelModia from 'src/components/featureToggle/useDeaktiverGammelModia';
import { nyModiaAtom } from 'src/components/NyModia';
import { aktivBrukerAtom } from 'src/lib/state/context';
import { meldingPanelIsOpenAtom, nyMeldingUnderArbeidAtom, svarUnderArbeidAtom } from 'src/lib/state/dialog';
import { paths } from 'src/utils/paths';

export function useSettAktivBruker() {
    const [currentFnr, setBruker] = useAtom(aktivBrukerAtom);
    const nyModia = useAtomValue(nyModiaAtom);
    const deaktivering = useDeaktiverGammelModia();
    const gammelModiaDeaktivert = deaktivering.status !== 'pending' && deaktivering.isOn;
    const navigate = useNavigate();
    const meldingPanelIsOpen = useAtomValue(meldingPanelIsOpenAtom);
    const setSvarUnderArbeid = useSetAtom(svarUnderArbeidAtom);
    const setNyMeldingUnderArbeid = useSetAtom(nyMeldingUnderArbeidAtom);

    return (fnr: string | null, redirect = true) => {
        if (!fnr) {
            navigate({ to: '/' });
            setBruker('');
            return;
        }

        if (currentFnr && fnr !== currentFnr && meldingPanelIsOpen) {
            setSvarUnderArbeid(undefined);
            setNyMeldingUnderArbeid(false);
        }

        setBruker(fnr);
        // Set fokus til personlinje med viktig informasjon (for skjermlesere og tastaturbrukere)
        document.getElementById('personlinje-header')?.focus();

        if (
            redirect &&
            ![
                '/new/person',
                paths.dokument,
                paths.personUri,
                paths.sakerFullscreen,
                paths.saksdokumentEgetVindu,
                paths.standaloneKomponenter,
                paths.landingPage
            ].some((path) => location.pathname.startsWith(path))
        ) {
            navigate({ to: nyModia || gammelModiaDeaktivert ? '/new/person/hjem' : paths.personUri }).finally(() => {
                document.getElementById('personlinje-header')?.focus();
            });
        }
    };
}
