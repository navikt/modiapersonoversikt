import { hentKontaktinformasjon } from '../../redux/restReducers/kontaktinformasjon';
import { erEgenAnsatt } from '../../redux/restReducers/egenansatt';
import { hentVergemal } from '../../redux/restReducers/vergemal';
import { hentFeatureToggles } from '../../redux/restReducers/featureToggles';
import { resetNavKontorResource } from '../../redux/restReducers/navkontor';
import { resetUtbetalingerResource } from '../../redux/restReducers/utbetalinger';
import { resetSykepengerResource } from '../../redux/restReducers/ytelser/sykepenger';
import { resetPleiepengerResource } from '../../redux/restReducers/ytelser/pleiepenger';
import { resetForeldrepengerResource } from '../../redux/restReducers/ytelser/foreldrepenger';
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
        oppslagNyBruker: (fnr: string) => {
            dispatch(hentPerson(fnr));
            dispatch(hentKontaktinformasjon(fnr));
            dispatch(erEgenAnsatt(fnr));
            dispatch(hentVergemal(fnr));
            dispatch(hentFeatureToggles());
            dispatch(resetNavKontorResource());
            dispatch(resetUtbetalingerResource());
            dispatch(resetSykepengerResource());
            dispatch(resetPleiepengerResource());
            dispatch(resetForeldrepengerResource());
            dispatch(resetUtførteUtbetalingerResource());
            dispatch(resetKontrollSpørsmål());
        }
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LyttPåNyttFnrIReduxOgHentAllPersoninfo);
