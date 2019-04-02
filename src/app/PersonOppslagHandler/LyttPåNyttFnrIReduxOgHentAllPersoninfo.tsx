import { resetKontrollSpørsmål } from '../../redux/kontrollSporsmal/actions';
import { useEffect } from 'react';
import { AppState } from '../../redux/reducers';
import { connect } from 'react-redux';
import { AsyncDispatch } from '../../redux/ThunkTypes';

interface StateProps {
    fnrIKontekst?: string;
}

interface DispatchProps {
    oppslagNyBruker: (fnr: string) => void;
}

type Props = StateProps & DispatchProps;

function LyttPåNyttFnrIReduxOgHentAllPersoninfo(props: Props) {
    useEffect(() => {
        if (props.fnrIKontekst) {
            props.oppslagNyBruker(props.fnrIKontekst);
        }
    }, [props.fnrIKontekst]);

    return null;
}

function mapStateToProps(state: AppState): StateProps {
    return {
        fnrIKontekst: state.gjeldendeBruker.fødselsnummer
    };
}

function mapDispatchToProps(dispatch: AsyncDispatch): DispatchProps {
    return {
        oppslagNyBruker: () =>
            dispatch((d: AsyncDispatch, getState: () => AppState) => {
                const restResources = getState().restResources;
                dispatch(restResources.personinformasjon.actions.fetch);
                dispatch(restResources.kontaktinformasjon.actions.fetch);
                dispatch(restResources.egenAnsatt.actions.fetch);
                dispatch(restResources.vergemal.actions.fetch);
                dispatch(restResources.featureToggles.actions.fetch);
                dispatch(restResources.brukersNavKontor.actions.reset);
                dispatch(restResources.utbetalinger.actions.reset);
                dispatch(restResources.sykepenger.actions.reset);
                dispatch(restResources.pleiepenger.actions.reset);
                dispatch(restResources.foreldrepenger.actions.reset);
                dispatch(restResources.utførteUtbetalingerYtelser.actions.reset);
                dispatch(resetKontrollSpørsmål());
            })
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LyttPåNyttFnrIReduxOgHentAllPersoninfo);
