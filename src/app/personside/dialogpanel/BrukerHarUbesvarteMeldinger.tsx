import * as React from 'react';
import { useRestResource } from '../../../rest/consumer/useRestResource';
import { erUbesvartHenvendelseFraBruker } from '../infotabs/meldinger/utils/meldingerUtils';
import { AlertStripeInfo } from 'nav-frontend-alertstriper';
import styled from 'styled-components';
import theme from '../../../styles/personOversiktTheme';

const Styling = styled.div`
    padding: ${theme.margin.layout};
    border-bottom: ${theme.border.skilleSvak};
`;

function BrukerHarUbesvarteMeldinger() {
    const traader = useRestResource(resources => resources.traader);

    const antallUbesvarteTraader = traader.data?.filter(traad => erUbesvartHenvendelseFraBruker(traad)).length;

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
