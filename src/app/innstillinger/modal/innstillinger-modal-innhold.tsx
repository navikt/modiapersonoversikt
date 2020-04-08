import * as React from 'react';
import { AlertStripeFeil } from 'nav-frontend-alertstriper';
import { Normaltekst, Undertekst } from 'nav-frontend-typografi';
import Spinner from 'nav-frontend-spinner';
import styled from 'styled-components/macro';
import InnstillingerModalForm from './innstillinger-modal-form';
import { connect } from 'react-redux';
import {
    State as InnstillingerState,
    sliceSelector as innstillingerSelector,
    hasError,
    isOk
} from './../../../redux/innstillinger';
import { AppState } from '../../../redux/reducers';

const CenteringDiv = styled.div`
    flex-grow: 1;
    display: flex;
    justify-content: center;
    align-items: center;
`;

interface Props {
    innstillinger: InnstillingerState;
}

function InnstillingerModalInnhold(props: Props) {
    if (hasError(props.innstillinger)) {
        return (
            <AlertStripeFeil>
                <Normaltekst>
                    Uthenting av dine innstillinger feilet (<b>{props.innstillinger.statusCode}</b>).
                </Normaltekst>
                <Undertekst>{props.innstillinger.error}</Undertekst>
            </AlertStripeFeil>
        );
    }
    if (!isOk(props.innstillinger)) {
        return (
            <CenteringDiv>
                <Spinner type="XXL" />
            </CenteringDiv>
        );
    }

    return <InnstillingerModalForm innstillinger={props.innstillinger} />;
}

const mapStateToProps = (state: AppState) => ({
    innstillinger: innstillingerSelector(state)
});

export default connect(mapStateToProps)(InnstillingerModalInnhold);
