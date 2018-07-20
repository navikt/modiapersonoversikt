import * as React from 'react';
import styled from 'styled-components';
import { STATUS } from '../../redux/restReducers/utils';
import { AlertStripeAdvarsel } from 'nav-frontend-alertstriper';
import { RestReducer } from '../../redux/restReducers/restReducer';

const MarginWrapper = styled.div`
  margin: 15px;
`;

interface FeilmeldingProps {
    reducer: RestReducer<object>;
}

function Feilmelding({reducer}: FeilmeldingProps) {
    if (reducer.status === STATUS.ERROR) {
        return (
            <MarginWrapper>
                <AlertStripeAdvarsel>Det skjedde en teknisk feil</AlertStripeAdvarsel>
            </MarginWrapper>
        );
    } else {
        return null;
    }
}

export default Feilmelding;