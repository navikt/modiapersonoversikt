import * as React from 'react';
import styled from 'styled-components';
import theme from '../../../styles/personOversiktTheme';
import KontrollSpørsmålKnapper from './KontrollSpørsmålKnapper';
import SpørsmålOgSvar from './SporsmalOgSvarContainer';
import HandleKontrollSporsmalHotkeys from './HandleKontrollSporsmalHotkeys';
import IfFeatureToggleOn from '../../../components/featureToggle/IfFeatureToggleOn';
import { FeatureToggles } from '../../../components/featureToggle/toggleIDs';
import { jobberMedSpørsmålOgSvar, kontrollspørsmålHarBlittLukketForBruker } from './cookieUtils';
import { erKontaktsenter } from '../../../utils/loggInfo/saksbehandlersEnhetInfo';
import { useAppState, useFødselsnummer, useRestResource } from '../../../utils/customHooks';
import { isLoading } from '../../../rest/utils/restResource';
import LazySpinner from '../../../components/LazySpinner';
import FillCenterAndFadeIn from '../../../components/FillCenterAndFadeIn';

const KontrollSporsmalStyling = styled.section`
    background-color: white;
    box-shadow: 0 0 0.5rem rgba(0, 0, 0, 0.1), 0 0 0 1px rgba(0, 0, 0, 0.1);
    padding: ${theme.margin.px20};
    margin-bottom: 0.5rem;
    display: -ms-grid;
    display: grid;
    -ms-grid-columns: 2fr 1fr;
    grid-template-areas: 'innhold knapper';
    .innhold {
        -ms-grid-row: 1;
        -ms-grid-column: 1;
        grid-area: innhold;
    }
    .knapper {
        -ms-grid-row: 1;
        -ms-grid-column: 2;
        grid-area: knapper;
    }
`;

function Kontrollsporsmal() {
    const visKontrollSpørsmål = useAppState(state => state.kontrollSpørsmål.open);
    const fnr = useFødselsnummer();
    const personResource = useRestResource(resources => resources.personinformasjon);

    if (
        !visKontrollSpørsmål ||
        jobberMedSpørsmålOgSvar() ||
        !erKontaktsenter() ||
        kontrollspørsmålHarBlittLukketForBruker(fnr)
    ) {
        return null;
    }

    if (isLoading(personResource)) {
        return (
            <FillCenterAndFadeIn>
                <LazySpinner />
            </FillCenterAndFadeIn>
        );
    }

    return (
        <IfFeatureToggleOn toggleID={FeatureToggles.Kontrollspørsmål}>
            <KontrollSporsmalStyling role="region" aria-label="Visittkort-hode">
                <h2 className={'visually-hidden'}>Kontrollspørsmål</h2>
                <div className="innhold">
                    <SpørsmålOgSvar />
                </div>
                <div className="knapper">
                    <KontrollSpørsmålKnapper />
                </div>
            </KontrollSporsmalStyling>
            <HandleKontrollSporsmalHotkeys />
        </IfFeatureToggleOn>
    );
}

export default Kontrollsporsmal;
