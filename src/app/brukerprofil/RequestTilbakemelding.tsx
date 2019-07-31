import * as React from 'react';
import styled from 'styled-components';

import AlertStripe from 'nav-frontend-alertstriper';

import { STATUS } from '../../redux/restReducers/utils';
import { PostStatus } from '../../rest/utils/postResource';

const TilbakemeldingWrapper = styled.div`
    margin-top: 1em;
`;

interface Props {
    status: STATUS | PostStatus;
    onSuccess: string;
    onError: string;
}

function RequestTilbakemelding({ status, onSuccess, onError }: Props) {
    if (status === STATUS.SUCCESS || status === PostStatus.SUCCESS) {
        return (
            <TilbakemeldingWrapper>
                <AlertStripe type={'suksess'}>{onSuccess}</AlertStripe>
            </TilbakemeldingWrapper>
        );
    } else if (status === STATUS.FAILED || status === PostStatus.FAIL) {
        return (
            <TilbakemeldingWrapper>
                <AlertStripe type={'advarsel'}>{onError}</AlertStripe>
            </TilbakemeldingWrapper>
        );
    } else {
        return null;
    }
}

export default RequestTilbakemelding;
