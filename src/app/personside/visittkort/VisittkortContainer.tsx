import * as React from 'react';
import { Person } from '../../../models/person/person';
import VisittkortHeader from './header/VisittkortHeader';
import VisittkortBody from './body/VisittkortBody';
import ErrorBoundary from '../../../components/ErrorBoundary';
import HandleVisittkortHotkeys from './HandleVisittkortHotkeys';
import { UnmountClosed } from 'react-collapse';
import AriaNotification from '../../../components/AriaNotification';
import styled from 'styled-components';
import theme from '../../../styles/personOversiktTheme';
import { erNyePersonoversikten } from '../../../utils/erNyPersonoversikt';
import HandleVisittkortHotkeysGamlemodia from './HandleVisittkortHotkeysGamlemodia';
import { loggSkjermInfoDaglig } from '../../../utils/loggInfo/loggSkjermInfoDaglig';
import { hasData, isFailed } from '../../../rest/utils/restResource';
import { useAppState, useOnMount, useRestResource } from '../../../utils/customHooks';
import { useDispatch } from 'react-redux';
import { AlertStripeFeil } from 'nav-frontend-alertstriper';
import { useCallback } from 'react';
import { toggleVisittkort } from '../../../redux/uiReducers/UIReducer';
import NavFrontendSpinner from 'nav-frontend-spinner';
import FillCenterAndFadeIn from '../../../components/FillCenterAndFadeIn';

const VisittkortBodyWrapper = styled.div`
    border-radius: ${theme.borderRadius.layout};
`;

const SpinnerWrapper = styled(FillCenterAndFadeIn)`
    background-color: white;
    padding: 1rem;
`;

function VisittkortContainer() {
    const erApnet = useAppState(state => state.ui.visittkort.apent);
    const personResource = useRestResource(resources => resources.personinformasjon);
    const dispatch = useDispatch();
    const toggle = useCallback(
        (apent?: boolean) => {
            dispatch(toggleVisittkort(apent));
        },
        [dispatch]
    );

    useOnMount(() => {
        loggSkjermInfoDaglig();
    });

    if (isFailed(personResource)) {
        return <AlertStripeFeil>Kunne ikke hente personinfo</AlertStripeFeil>;
    }

    if (!hasData(personResource)) {
        return (
            <SpinnerWrapper>
                <NavFrontendSpinner type="XL" />
            </SpinnerWrapper>
        );
    }

    const person = personResource.data as Person;

    const visittkortHotkeys = erNyePersonoversikten() ? (
        <HandleVisittkortHotkeys />
    ) : (
        <HandleVisittkortHotkeysGamlemodia />
    );
    return (
        <ErrorBoundary>
            <AriaNotification
                beskjed={`Visittkortet ble ${erApnet ? 'åpnet' : 'lukket'}`}
                dontShowOnFirstRender={true}
            />
            {visittkortHotkeys}
            <article role="region" aria-label="Visittkort" aria-expanded={erApnet}>
                <VisittkortHeader person={person} toggleVisittkort={toggle} visittkortApent={erApnet} />
                <VisittkortBodyWrapper className="hook-for-spesialstyling-i-gamlemodia-visittkortbodywrapper">
                    <UnmountClosed isOpened={erApnet}>
                        <VisittkortBody person={person} />
                    </UnmountClosed>
                </VisittkortBodyWrapper>
            </article>
        </ErrorBoundary>
    );
}

export default VisittkortContainer;
