import * as React from 'react';
import { useEffect } from 'react';
import renderDecoratorHead from '../decorator';
import { AppState } from '../redux/reducers';
import { connect } from 'react-redux';

interface StateProps {
    fødselsnummer: string;
}

function Decorator(props: StateProps) {
    useEffect(() => {
        renderDecoratorHead(props.fødselsnummer);
    }, [props.fødselsnummer]);

    return <nav id="header" />;
}

function mapStateToProps(state: AppState): StateProps {
    return {
        fødselsnummer: state.gjeldendeBruker.fødselsnummer
    };
}

export default connect(mapStateToProps)(Decorator);
