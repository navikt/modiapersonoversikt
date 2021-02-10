import * as React from 'react';
import styled from 'styled-components/macro';
import theme from '../../../styles/personOversiktTheme';
import KontrollSpørsmålKnapper from './KontrollSpørsmålKnapper';
import SpørsmålOgSvar from './SporsmalOgSvarContainer';
import HandleKontrollSporsmalHotkeys from './HandleKontrollSporsmalHotkeys';
import { useAppState, useFodselsnummer } from '../../../utils/customHooks';
import LazySpinner from '../../../components/LazySpinner';
import FillCenterAndFadeIn from '../../../components/FillCenterAndFadeIn';
import { useErKontaktsenter } from '../../../utils/enheter-utils';
import { useRestResource } from '../../../rest/consumer/useRestResource';
import { kontrollspørsmålHarBlittLukketForBruker } from './cookie-utils';

const KontrollSporsmalStyling = styled.section`
    background-color: white;
    box-shadow: 0 0 0.5rem rgba(0, 0, 0, 0.1), 0 0 0 1px rgba(0, 0, 0, 0.1);
    padding: ${theme.margin.layout};
    margin-bottom: ${theme.margin.layout};
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

const SpinnerWrapper = styled(FillCenterAndFadeIn)`
    background-color: white;
    height: 7rem;
    margin-bottom: 0.5rem;
`;

const Placeholder = (
    <SpinnerWrapper>
        <LazySpinner />
    </SpinnerWrapper>
);

const placeholderProps = { returnOnPending: Placeholder };
function Kontrollsporsmal() {
    const visKontrollSpørsmål = useAppState(state => state.kontrollSpørsmål.open);
    const fnr = useFodselsnummer();
    const personResource = useRestResource(resources => resources.personinformasjon, placeholderProps);
    const erKontaktsenter = useErKontaktsenter();
    const jobberMedSTO = useAppState(state => state.session.jobberMedSTO);

    if (!visKontrollSpørsmål || jobberMedSTO || !erKontaktsenter || kontrollspørsmålHarBlittLukketForBruker(fnr)) {
        return null;
    }

    if (!personResource.data) {
        return personResource.placeholder;
    }

    return (
        <>
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
        </>
    );
}

export default Kontrollsporsmal;
