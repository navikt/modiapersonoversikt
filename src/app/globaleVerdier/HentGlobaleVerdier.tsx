import { useEffect } from 'react';
import { AppState } from '../../redux/reducers';
import { connect } from 'react-redux';
import { AsyncDispatch } from '../../redux/ThunkTypes';

interface StateProps {}

interface DispatchProps {
    hentGlobaleVerdier: () => void;
}

type Props = StateProps & DispatchProps;

function HentGlobaleVerdier(props: Props) {
    useEffect(() => {
        props.hentGlobaleVerdier();
    }, []);

    return null;
}

function mapStateToProps(state: AppState): StateProps {
    return {
        fnrIKontekst: state.gjeldendeBruker.fødselsnummer
    };
}

function mapDispatchToProps(dispatch: AsyncDispatch): DispatchProps {
    return {
        hentGlobaleVerdier: () =>
            dispatch((d: AsyncDispatch, getState: () => AppState) => {
                const restResources = getState().restResources;
                dispatch(restResources.innloggetSaksbehandler.actions.fetch);
                dispatch(restResources.oppgaveGsakTema.actions.fetch);
            })
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(HentGlobaleVerdier);
