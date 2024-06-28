import * as React from 'react';
import { AlertStripeFeil } from 'nav-frontend-alertstriper';
import { Normaltekst, Undertekst } from 'nav-frontend-typografi';
import Spinner from 'nav-frontend-spinner';
import styled from 'styled-components/macro';
import InnstillingerModalForm from './InnstillingerModalForm';
import innstillingerResource from '../../../rest/resources/innstillingerResource';

const CenteringDiv = styled.div`
    flex-grow: 1;
    display: flex;
    justify-content: center;
    align-items: center;
`;

function InnstillingerModalInnhold() {
    const innstillinger = innstillingerResource.useFetch();
    if (innstillinger.isLoading) {
        return (
            <CenteringDiv>
                <Spinner type="XXL" />
            </CenteringDiv>
        );
    } else if (innstillinger.isError) {
        return (
            <AlertStripeFeil>
                <Normaltekst>
                    Uthenting av dine innstillinger feilet (<b>{innstillinger.error}</b>).
                </Normaltekst>
                <Undertekst>{innstillinger.error}</Undertekst>
            </AlertStripeFeil>
        );
    }

    return <InnstillingerModalForm innstillinger={innstillinger.data} />;
}

export default InnstillingerModalInnhold;
