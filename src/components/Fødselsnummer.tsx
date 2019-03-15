import * as React from 'react';
import { AppState } from '../redux/reducers';
import { connect } from 'react-redux';

interface StateProps {
    fødselsnummer?: string;
}

function Fødselsnummer(props: StateProps) {
    if (!props.fødselsnummer) {
        return <>Kunne ikke finne fødselsnummer</>;
    }

    return <>{props.fødselsnummer}</>;
}

function mapStateToProps(state: AppState): StateProps {
    return {
        fødselsnummer: state.gjeldendeBruker.fødselsnummer
    };
}

export default connect(mapStateToProps)(Fødselsnummer);
