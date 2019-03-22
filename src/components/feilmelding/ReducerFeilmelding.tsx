import * as React from 'react';
import styled from 'styled-components';
import { AlertStripeAdvarsel } from 'nav-frontend-alertstriper';
import { isFailed, RestReducer } from '../../redux/restReducers/restReducer';

const MarginWrapper = styled.div`
    margin: 15px;
`;

interface FeilmeldingProps {
    reducer: RestReducer<object>;
}

function ReducerFeilmelding({ reducer }: FeilmeldingProps) {
    if (isFailed(reducer)) {
        return (
            <MarginWrapper>
                <AlertStripeAdvarsel>Det skjedde en teknisk feil</AlertStripeAdvarsel>
            </MarginWrapper>
        );
    } else {
        return null;
    }
}

export default ReducerFeilmelding;
