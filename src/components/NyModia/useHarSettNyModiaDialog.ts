import { atom, useAtom } from 'jotai';
import { FeatureToggles } from 'src/components/featureToggle/toggleIDs';
import useFeatureToggle from 'src/components/featureToggle/useFeatureToggle';
import { useInnstillinger, useOppdaterInnstillinger } from 'src/lib/clients/innstillinger';

export const openIntroduksjonsModalAtom = atom<boolean>(false);

const INNSTILLINGER_KEY = 'har-sett-oppstart-ny-modia';

function useHarSettNyModiaDialog(): [boolean, () => void] {
    const innstillingerResult = useInnstillinger();
    const { mutate } = useOppdaterInnstillinger();

    const harSett: boolean = innstillingerResult.isSuccess
        ? innstillingerResult.data.innstillinger[INNSTILLINGER_KEY] === 'true'
        : true;

    const markerSomSett = () => {
        if (innstillingerResult.isSuccess) {
            mutate({
                ...innstillingerResult.data.innstillinger,
                [INNSTILLINGER_KEY]: 'true'
            });
        }
    };

    return [harSett, markerSomSett];
}

function useOpenIntroduksjonsModal(): [boolean, (toggleVal: boolean) => void] {
    const [harSett, markerSomSett] = useHarSettNyModiaDialog();
    const [manueltOpnet, setManueltOpnet] = useAtom(openIntroduksjonsModalAtom);
    const { isOn } = useFeatureToggle(FeatureToggles.NyModiaKnapp);

    const open = (manueltOpnet || !harSett) && isOn;

    const toggleModal = (openModal: boolean) => {
        if (openModal) {
            setManueltOpnet(true);
        } else {
            setManueltOpnet(false);
            markerSomSett();
        }
    };

    return [!!open, toggleModal];
}

export default useOpenIntroduksjonsModal;
