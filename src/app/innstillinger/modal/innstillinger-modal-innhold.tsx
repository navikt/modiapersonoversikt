import * as React from 'react';
import { AlertStripeFeil } from 'nav-frontend-alertstriper';
import { Normaltekst, Undertekst } from 'nav-frontend-typografi';
import Spinner from 'nav-frontend-spinner';
import styled from 'styled-components/macro';
import InnstillingerModalForm from './innstillinger-modal-form';
import innstillingerResource from '../../../rest/resources/innstillingerResource';
import { hasError, isPending } from '@nutgaard/use-fetch';

const CenteringDiv = styled.div`
    flex-grow: 1;
    display: flex;
    justify-content: center;
    align-items: center;
`;

function InnstillingerModalInnhold() {
    const innstillinger = innstillingerResource.useFetch();
    if (isPending(innstillinger)) {
        return (
            <CenteringDiv>
                <Spinner type="XXL" />
            </CenteringDiv>
        );
    } else if (hasError(innstillinger)) {
        return (
            <AlertStripeFeil>
                <Normaltekst>
                    Uthenting av dine innstillinger feilet (<b>{innstillinger.statusCode}</b>).
                </Normaltekst>
                <Undertekst>{innstillinger.error}</Undertekst>
            </AlertStripeFeil>
        );
    }

    return <InnstillingerModalForm innstillinger={innstillinger.data} />;
}

export default InnstillingerModalInnhold;
