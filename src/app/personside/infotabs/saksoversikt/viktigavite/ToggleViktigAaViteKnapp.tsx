import * as React from 'react';
import { connect } from 'react-redux';
import { setViktigÅViteÅpen } from '../../../../../redux/saksoversikt/actions';
import { AppState } from '../../../../../redux/reducers';
import { Sakstema } from '../../../../../models/saksoversikt/sakstema';
import EkspanderKnapp from '../../../../../components/EkspanderKnapp';
import { AsyncDispatch } from '../../../../../redux/ThunkTypes';

interface StateProps {
    valgtSakstema?: Sakstema;
    åpen: boolean;
}

interface DispatchProps {
    setÅpen: (åpen: boolean) => void;
}

type Props = StateProps & DispatchProps;

function ToggleViktigAaViteKnapp(props: Props) {
    const temakoderMedTekst = ['AAP', 'DAG', 'IND'];

    if (!props.valgtSakstema || !temakoderMedTekst.includes(props.valgtSakstema.temakode)) {
        return null;
    }

    const sakstemanavn = props.valgtSakstema && props.valgtSakstema.temanavn;

    return (
        <EkspanderKnapp
            open={props.åpen}
            onClick={() => props.setÅpen(!props.åpen)}
            tittel={'viktig å vite om ' + sakstemanavn}
        />
    );
}

function mapStateToProps(state: AppState): StateProps {
    return {
        valgtSakstema: state.saksoversikt.valgtSakstema,
        åpen: state.saksoversikt.viktigÅViteÅpen
    };
}

function mapDispatchToProps(dispatch: AsyncDispatch): DispatchProps {
    return {
        setÅpen: (åpen: boolean) => dispatch(setViktigÅViteÅpen(åpen))
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ToggleViktigAaViteKnapp);
