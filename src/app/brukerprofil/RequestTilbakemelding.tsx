import * as React from 'react';
import styled from 'styled-components/macro';
import AlertStripe from 'nav-frontend-alertstriper';
import { PostStatus } from '../../rest/utils/postResource';

const TilbakemeldingWrapper = styled.div`
    margin-top: 1em;
`;

interface Props {
    status: PostStatus;
    onSuccess: string;
    onError: string;
}

function RequestTilbakemelding({ status, onSuccess, onError }: Props) {
    if (status === PostStatus.SUCCESS) {
        return (
            <TilbakemeldingWrapper>
                <AlertStripe type={'suksess'}>{onSuccess}</AlertStripe>
            </TilbakemeldingWrapper>
        );
    } else if (status === PostStatus.FAIL) {
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
