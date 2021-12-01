import * as React from 'react';
import styled from 'styled-components/macro';
import theme from '../../../styles/personOversiktTheme';
import KontrollSporsmalKnapper from './KontrollSporsmalKnapper';
import SporsmalOgSvar from './SporsmalOgSvarContainer';
import HandleKontrollSporsmalHotkeys from './HandleKontrollSporsmalHotkeys';
import { useAppState, useFodselsnummer, useHentPersondata } from '../../../utils/customHooks';
import LazySpinner from '../../../components/LazySpinner';
import { useErKontaktsenter } from '../../../utils/enheter-utils';
import { kontrollsporsmalHarBlittLukketForBruker } from './cookie-utils';
import useFeatureToggle from '../../../components/featureToggle/useFeatureToggle';
import { FeatureToggles } from '../../../components/featureToggle/toggleIDs';
import { hasError, isPending } from '@nutgaard/use-fetch';
import { AlertStripeAdvarsel } from 'nav-frontend-alertstriper';

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

function Kontrollsporsmal() {
    const visKontrollSporsmal = useAppState((state) => state.kontrollSporsmal.open);
    const fnr = useFodselsnummer();
    const persondata = useHentPersondata();
    const erKontaktsenter = useErKontaktsenter();
    const jobberMedSTO = useAppState((state) => state.session.jobberMedSTO);
    const usingSFBackend = useFeatureToggle(FeatureToggles.BrukSalesforceDialoger).isOn ?? false;

    if (
        usingSFBackend ||
        !visKontrollSporsmal ||
        jobberMedSTO ||
        !erKontaktsenter ||
        kontrollsporsmalHarBlittLukketForBruker(fnr)
    ) {
        return null;
    }

    if (isPending(persondata)) {
        return <LazySpinner type={'M'} />;
    } else if (hasError(persondata)) {
        return <AlertStripeAdvarsel>Feil ved lasting av data</AlertStripeAdvarsel>;
    }

    return (
        <>
            <KontrollSporsmalStyling role="region" aria-label="Visittkort-hode">
                <h2 className={'visually-hidden'}>Kontrollspørsmål</h2>
                <div className="innhold">
                    <SporsmalOgSvar />
                </div>
                <div className="knapper">
                    <KontrollSporsmalKnapper />
                </div>
            </KontrollSporsmalStyling>
            <HandleKontrollSporsmalHotkeys />
        </>
    );
}

export default Kontrollsporsmal;
