import * as React from 'react';
import styled from 'styled-components';

import AlertStripe from 'nav-frontend-alertstriper';

import { STATUS } from '../../redux/utils';

const TilbakemeldingWrapper = styled.div`
  margin-top: 1em;
`;

interface Props {
    status: STATUS;
    onSuccess: string;
    onError: string;
}

function RequestTilbakemelding({ status, onSuccess, onError }: Props) {
    if (status === STATUS.OK) {
        return (
            <TilbakemeldingWrapper>
                <AlertStripe type={'suksess'}>
                    {onSuccess}
                </AlertStripe>
            </TilbakemeldingWrapper>
        );
    } else if (status === STATUS.ERROR) {
        return (
            <TilbakemeldingWrapper>
                <AlertStripe type={'advarsel'}>
                    {onError}
                </AlertStripe>
            </TilbakemeldingWrapper>
        );
    } else {
        return null;
    }
}

export default RequestTilbakemelding;
