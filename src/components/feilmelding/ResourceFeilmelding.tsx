import * as React from 'react';
import styled from 'styled-components';
import { AlertStripeAdvarsel } from 'nav-frontend-alertstriper';
import { isFailed, DeprecatedRestResource } from '../../redux/restReducers/deprecatedRestResource';

const MarginWrapper = styled.div`
    margin: 15px;
`;

interface FeilmeldingProps {
    resource: DeprecatedRestResource<object>;
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
