import EkspanderKnapp from '../../../../../components/EkspanderKnapp';
import type { Sakstema } from '../../../../../models/saksoversikt/sakstema';

interface OwnProps {
    valgtSakstema?: Sakstema;
}

interface StateProps {
    open: boolean;
}

interface DispatchProps {
    setOpen: (åpen: boolean) => void;
}

type Props = StateProps & DispatchProps & OwnProps;

export default function ToggleViktigAaViteKnapp(props: Props) {
    const temakoderMedTekst = ['AAP', 'DAG', 'IND'];

    if (!props.valgtSakstema || !temakoderMedTekst.includes(props.valgtSakstema.temakode)) {
        return null;
    }

    const sakstemanavn = props.valgtSakstema && props.valgtSakstema.temanavn;

    return (
        <EkspanderKnapp
            open={props.open}
            onClick={() => props.setOpen(!props.open)}
            tittel={'Viktig å vite om ' + sakstemanavn}
        />
    );
}
