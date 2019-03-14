import * as React from 'react';
import { useEffect } from 'react';
import { connect } from 'react-redux';
import { AppState } from '../../redux/reducers';
import renderDecoratorHead from '../../decorator';
import Personside from './Personside';

interface StateProps {
    fodselsnummer: string;
}

type Props = StateProps;

function PersonsideContainer(props: Props) {
    useEffect(() => {
        renderDecoratorHead(props.fodselsnummer);
    }, [props.fodselsnummer]);

    return <Personside />;
}

function mapStateToProps(state: AppState): StateProps {
    return {
        fodselsnummer: state.gjeldendeBruker.fødselsnummer
    };
}

export default connect(mapStateToProps)(PersonsideContainer);
