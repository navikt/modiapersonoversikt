import { Outlet, useLocation, useNavigate } from '@tanstack/react-router';
import { guid } from 'nav-frontend-js-utils';
import { useEffect, useRef } from 'react';
import styled from 'styled-components';
import ErrorBoundary from '../../../components/ErrorBoundary';
import { MeldingsokProvider } from '../../../context/meldingsok';
import { useVisittkortState } from '../../../context/visittkort-state';
import useKeepScroll from '../../../utils/hooks/useKeepScroll';
import { personPaths } from '../../routes/routing';
import HandleInfotabsHotkeys from './HandleInfotabsHotkeys';
import { INFOTABS, type InfotabsType } from './InfoTabEnum';
import TabKnapper from './TabKnapper';
import { useOpenTab } from './utils/useOpenTab';

const StyledArticle = styled.article`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  overflow-y: auto;
`;

function InfoTabs() {
    const paths = personPaths;
    const headerRef = useRef<HTMLHeadingElement>(null);
    const articleId = useRef(guid());
    const openTab = useOpenTab();
    const location = useLocation();
    const navigate = useNavigate();
    const visittkortStatus = useVisittkortState();

    const updateRouterPath = (newTab: InfotabsType) => {
        const path = `${paths.personUri}/${INFOTABS[newTab].path}` as const;
        const newPath = location.pathname !== path;
        if (newPath) {
            navigate({ to: path });
        }
        visittkortStatus.setApent(false);
    };

    useEffect(() => {
        const focusWithinTab = openTabRef.current?.contains(document.activeElement);
        if (!focusWithinTab) {
            headerRef.current?.focus();
        }
    }, []);

    useEffect(() => {
        document.title = `Modia personoversikt - ${openTab.tittel}`;
    }, [openTab]);

    const openTabRef = useRef<HTMLDivElement>(null);
    const storeCroll = useKeepScroll(openTabRef, `Opentab-${openTab.path}`);

    return (
        <ErrorBoundary boundaryName="InfoTabs">
            <HandleInfotabsHotkeys />
            <TabKnapper openTab={openTab} onTabChange={updateRouterPath} />
            <ErrorBoundary boundaryName={`Open tab: ${openTab.tittel}`}>
                <StyledArticle ref={openTabRef} onScroll={storeCroll} aria-labelledby={articleId.current}>
                    <h2
                        id={articleId.current}
                        ref={headerRef}
                        tabIndex={-1}
                        className="sr-only"
                        aria-live={'assertive'}
                    >
                        {openTab.tittel} - Fane
                    </h2>
                    <MeldingsokProvider>
                        <Outlet />
                    </MeldingsokProvider>
                </StyledArticle>
            </ErrorBoundary>
        </ErrorBoundary>
    );
}

export default InfoTabs;
