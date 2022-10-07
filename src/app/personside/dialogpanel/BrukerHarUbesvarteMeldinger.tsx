import * as React from 'react';
import { erUbesvartHenvendelseFraBruker } from '../infotabs/meldinger/utils/meldingerUtils';
import { AlertStripeInfo } from 'nav-frontend-alertstriper';
import styled from 'styled-components';
import theme from '../../../styles/personOversiktTheme';
import brukersdialog from '../../../rest/resources/brukersdialog';
import { hasData } from '@nutgaard/use-fetch';

const Styling = styled.div`
    padding: ${theme.margin.layout};
    border-bottom: ${theme.border.skilleSvak};
`;

function BrukerHarUbesvarteMeldinger() {
    const traader = brukersdialog.useFetch();
    const antallUbesvarteTraader = hasData(traader)
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
