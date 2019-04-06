import { hentKontaktinformasjon } from '../../redux/restReducers/kontaktinformasjon';
import { hentVergemal } from '../../redux/restReducers/vergemal';
import { hentFeatureToggles } from '../../redux/restReducers/featureToggles';
import { resetNavKontorResource } from '../../redux/restReducers/navkontor';
import { resetUtbetalingerResource } from '../../redux/restReducers/utbetalinger';
import { resetUtførteUtbetalingerResource } from '../../redux/restReducers/ytelser/utførteUtbetalinger';
import { resetKontrollSpørsmål } from '../../redux/kontrollSporsmal/actions';
import { hentPerson } from '../../redux/restReducers/personinformasjon';
import { useEffect } from 'react';
import { AppState } from '../../redux/reducers';
import { connect } from 'react-redux';
import { AsyncDispatch } from '../../redux/ThunkTypes';

interface StateProps {
    fnrIKontekst?: string;
}

interface DispatchProps {
    oppslagNyBruker: () => void;
}

type Props = StateProps & DispatchProps;

function LyttPåNyttFnrIReduxOgHentAllPersoninfo(props: Props) {
    useEffect(() => {
        if (props.fnrIKontekst) {
            props.oppslagNyBruker();
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
                const fnr = getState().gjeldendeBruker.fødselsnummer;
                const restResources = getState().restResources;
                dispatch(hentPerson(fnr));
                dispatch(hentKontaktinformasjon(fnr));
                dispatch(restResources.egenAnsatt.actions.reset);
                dispatch(hentVergemal(fnr));
                dispatch(hentFeatureToggles());
                dispatch(resetNavKontorResource());
                dispatch(resetUtbetalingerResource());
                dispatch(restResources.sykepenger.actions.reset);
                dispatch(restResources.pleiepenger.actions.reset);
                dispatch(restResources.foreldrepenger.actions.reset);
                dispatch(resetUtførteUtbetalingerResource());
                dispatch(resetKontrollSpørsmål());
            })
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LyttPåNyttFnrIReduxOgHentAllPersoninfo);
