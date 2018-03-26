import * as React from 'react';
import styled from 'styled-components';
import { STATUS } from '../../redux/utils';
import { AlertStripeAdvarsel } from 'nav-frontend-alertstriper';
import { Reducer } from '../../redux/reducer';

const FeilmeldingWrapper = styled.div`
  margin: 15px;
`;

interface FeilmeldingProps {
    reducer: Reducer<object>;
}

function Feilmelding({reducer}: FeilmeldingProps) {
    if (reducer.status === STATUS.ERROR) {
        return (
            <FeilmeldingWrapper>
                <AlertStripeAdvarsel>Det skjedde en feil: {reducer.error}</AlertStripeAdvarsel>
            </FeilmeldingWrapper>
        );
    } else {
        return null;
    }
}

export default Feilmelding;