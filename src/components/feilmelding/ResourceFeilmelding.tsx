import * as React from 'react';
import styled from 'styled-components';
// import { AlertStripeAdvarsel } from 'nav-frontend-alertstriper';
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
                <p>Det skjedde en teknisk feil</p>
            </MarginWrapper>
        );
    } else {
        return null;
    }
}

export default ReducerFeilmelding;
