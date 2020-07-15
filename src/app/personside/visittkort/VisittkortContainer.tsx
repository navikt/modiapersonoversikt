import * as React from 'react';
import { useCallback } from 'react';
import { Person } from '../../../models/person/person';
import VisittkortHeader from './header/VisittkortHeader';
import VisittkortBody from './body/VisittkortBody';
import ErrorBoundary from '../../../components/ErrorBoundary';
import HandleVisittkortHotkeys from './HandleVisittkortHotkeys';
import { UnmountClosed } from 'react-collapse';
import AriaNotification from '../../../components/AriaNotification';
import styled from 'styled-components/macro';
import theme from '../../../styles/personOversiktTheme';
import { useAppState } from '../../../utils/customHooks';
import { useDispatch } from 'react-redux';
import { toggleVisittkort } from '../../../redux/uiReducers/UIReducer';
import FillCenterAndFadeIn from '../../../components/FillCenterAndFadeIn';
import { useRestResource } from '../../../rest/consumer/useRestResource';
import LazySpinner from '../../../components/LazySpinner';

const VisittkortBodyWrapper = styled.div`
    border-radius: ${theme.borderRadius.layout};
`;

const SpinnerWrapper = styled(FillCenterAndFadeIn)`
    background-color: white;
    height: 5rem;
`;

const PlaceHolder = (
    <SpinnerWrapper>
        <LazySpinner type="XL" />
    </SpinnerWrapper>
);

function VisittkortContainer() {
    const erApnet = useAppState(state => state.ui.visittkort.apent);
    const personResource = useRestResource(resources => resources.personinformasjon, {
        returnOnError: 'Kunne ikke hente personinfo',
        returnOnPending: PlaceHolder
    });
    const dispatch = useDispatch();
    const toggle = useCallback(
        (apent?: boolean) => {
            dispatch(toggleVisittkort(apent));
        },
        [dispatch]
    );

    if (!personResource.data) {
        return personResource.placeholder;
    }

    const person = personResource.data as Person;
    return (
        <ErrorBoundary>
            <AriaNotification
                beskjed={`Visittkortet ble ${erApnet ? 'åpnet' : 'lukket'}`}
                dontShowOnFirstRender={true}
            />
            <HandleVisittkortHotkeys />
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
