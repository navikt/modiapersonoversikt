import * as React from 'react';
import styled from 'styled-components';
import { AlertStripeAdvarsel } from 'nav-frontend-alertstriper';
import { isFailed, RestResource } from '../../redux/restReducers/restResource';

const MarginWrapper = styled.div`
    margin: 15px;
`;

interface FeilmeldingProps {
    resource: RestResource<object>;
}

function ReducerFeilmelding({ resource }: FeilmeldingProps) {
    if (isFailed(resource)) {
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
