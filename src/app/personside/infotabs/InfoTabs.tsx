import * as React from 'react';
import { useEffect, useRef } from 'react';
import { INFOTABS } from './InfoTabEnum';
import TabKnapper from './TabKnapper';
import styled from 'styled-components/macro';
import UtbetalingerContainer from './utbetalinger/UtbetalingerContainer';
import YtelserContainer from './ytelser/YtelserContainer';
import { usePaths } from '../../routes/routing';
import { Route, Switch, useHistory, useLocation } from 'react-router';
import SaksoversiktContainer from './saksoversikt/SaksoversiktContainer';
import ErrorBoundary from '../../../components/ErrorBoundary';
import OppfolgingContainer from './oppfolging/OppfolgingContainer';
import VarslerContainer from './varsel/VarslerContainer';
import MeldingerContainer from './meldinger/MeldingerContainer';
import Oversikt from './oversikt/Oversikt';
import { useInfotabsDyplenker } from './dyplenker';
import { useFødselsnummer } from '../../../utils/customHooks';
import { useDispatch } from 'react-redux';
import { toggleVisittkort } from '../../../redux/uiReducers/UIReducer';
import HandleInfotabsHotkeys from './HandleInfotabsHotkeys';
import { loggEvent } from '../../../utils/frontendLogger';
import useKeepScroll from '../../../utils/hooks/useKeepScroll';
import { capitalizeName } from '../../../utils/stringFormatting';
import { guid } from 'nav-frontend-js-utils';
import { useOpenTab } from './utils/useOpenTab';

const StyledArticle = styled.article`
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    overflow-y: auto;
`;

function InfoTabs() {
    const fødselsnummer = useFødselsnummer();
    const paths = usePaths();
    const headerRef = useRef<HTMLHeadingElement>(null);
    const dyplenker = useInfotabsDyplenker();
    const dispatch = useDispatch();
    const articleId = useRef(guid());
    const openTab = useOpenTab();
    const history = useHistory();
    const location = useLocation();

    const updateRouterPath = (newTab: INFOTABS) => {
        const path = `${paths.personUri}/${fødselsnummer}/${INFOTABS[newTab].toLowerCase()}/`;
        const newPath = history.location.pathname !== path;
        if (newPath) {
            history.push(path);
        }
        dispatch(toggleVisittkort(false));
    };

    useEffect(() => {
        const focusWithinTab = openTabRef.current?.contains(document.activeElement);
        if (!focusWithinTab) {
            headerRef.current?.focus();
        }
    }, [openTab, headerRef]);

    useEffect(() => {
        loggEvent(openTab, 'Tabs');
        document.title = 'Modia personoversikt - ' + capitalizeName(openTab);
    }, [openTab]);

    const openTabRef = useRef<HTMLDivElement>(null);
    const storeCroll = useKeepScroll(openTabRef, 'Opentab-' + openTab);

    return (
        <ErrorBoundary boundaryName="InfoTabs">
            <HandleInfotabsHotkeys />
            <TabKnapper openTab={openTab} onTabChange={updateRouterPath} />
            <ErrorBoundary boundaryName={'Open tab: ' + openTab}>
                <StyledArticle ref={openTabRef} onScroll={storeCroll} aria-labelledby={articleId.current}>
                    <h2
                        id={articleId.current}
                        ref={headerRef}
                        tabIndex={-1}
                        className="sr-only"
                        aria-live={'assertive'}
                    >
                        {openTab} - Fane
                    </h2>
                    <Switch location={location}>
                        <Route path={dyplenker.utbetaling.route} component={UtbetalingerContainer} />
                        <Route path={paths.oppfolging} component={OppfolgingContainer} />
                        <Route path={dyplenker.meldinger.route} component={MeldingerContainer} />
                        <Route path={dyplenker.saker.route} component={SaksoversiktContainer} />
                        <Route path={dyplenker.ytelser.route} component={YtelserContainer} />
                        <Route path={paths.varsler} component={VarslerContainer} />
                        <Route path={''} component={Oversikt} />
                    </Switch>
                </StyledArticle>
            </ErrorBoundary>
        </ErrorBoundary>
    );
}

export default InfoTabs;
