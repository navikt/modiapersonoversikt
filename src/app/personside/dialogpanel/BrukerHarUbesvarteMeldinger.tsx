import * as React from 'react';
import { erUbesvartHenvendelseFraBruker } from '../infotabs/meldinger/utils/meldingerUtils';
import { AlertStripeInfo } from 'nav-frontend-alertstriper';
import styled from 'styled-components';
import theme from '../../../styles/personOversiktTheme';
import dialogResource from '../../../rest/resources/dialogResource';

const Styling = styled.div`
    padding: ${theme.margin.layout};
    border-bottom: ${theme.border.skilleSvak};
`;

function BrukerHarUbesvarteMeldinger() {
    const traader = dialogResource.useFetch();
    const antallUbesvarteTraader = traader.isSuccess
        ? traader.data?.filter((traad) => erUbesvartHenvendelseFraBruker(traad))?.length
        : undefined;

    if (!antallUbesvarteTraader) {
        return null;
    }

    return (
        <Styling>
            <AlertStripeInfo>
                Brukeren har {antallUbesvarteTraader}{' '}
                {antallUbesvarteTraader > 1 ? 'ubesvarte henvendelser' : 'ubesvart henvendelse'}
            </AlertStripeInfo>
        </Styling>
    );
}

export default BrukerHarUbesvarteMeldinger;
