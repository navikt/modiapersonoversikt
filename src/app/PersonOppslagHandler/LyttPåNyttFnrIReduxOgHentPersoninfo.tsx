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

function LyttPåNyttFnrIReduxOgHentPersoninfo(props: Props) {
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
        }
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LyttPåNyttFnrIReduxOgHentPersoninfo);
