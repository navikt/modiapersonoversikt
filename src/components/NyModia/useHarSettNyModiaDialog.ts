import { useInnstillinger, useOppdaterInnstillinger } from 'src/lib/clients/innstillinger';

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

export default useHarSettNyModiaDialog;
