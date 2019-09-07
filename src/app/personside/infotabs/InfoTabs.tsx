import * as React from 'react';
import { INFOTABS } from './InfoTabEnum';
import TabKnapper from './TabKnapper';
import styled from 'styled-components';
import UtbetalingerContainer from './utbetalinger/UtbetalingerContainer';
import YtelserContainer from './ytelser/YtelserContainer';
import { usePaths } from '../../routes/routing';
import { Route, RouteComponentProps, Switch } from 'react-router';
import { withRouter } from 'react-router-dom';
import SaksoversiktContainer from './saksoversikt/SaksoversiktContainer';
import ErrorBoundary from '../../../components/ErrorBoundary';
import theme from '../../../styles/personOversiktTheme';
import OppfolgingContainer from './oppfolging/OppfolgingContainer';
import VarslerContainer from './varsel/VarslerContainer';
import MeldingerContainer from './meldinger/MeldingerContainer';
import Oversikt from './oversikt/Oversikt';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '../../../redux/reducers';
import HandleInfotabsHotkeys from './HandleInfotabsHotkeys';
import { useInfotabsDyplenker } from './dyplenker';
import { toggleVisittkort } from '../../../redux/uiReducers/UIReducer';

type Props = RouteComponentProps<{}>;

const OpenTab = styled.div`
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    overflow-y: auto;
    padding: ${theme.margin.layout};
`;

const Section = styled.section`
    flex-grow: 1;
    display: flex;
    flex-direction: column;
`;

export function getOpenTabFromRouterPath(currentPath: string): INFOTABS {
    const infoTabs: INFOTABS[] = Object.keys(INFOTABS).map(key => INFOTABS[key]);
    const openTab: INFOTABS | undefined = infoTabs.find((infoTab: string) =>
        currentPath
            .toUpperCase()
            .split('/')
            .includes(infoTab)
    );
    return openTab || INFOTABS.OVERSIKT;
}

function InfoTabs(props: Props) {
    const fødselsnummer = useSelector((state: AppState) => state.gjeldendeBruker.fødselsnummer);
    const paths = usePaths();
    const ref = React.createRef<HTMLHeadingElement>();
    const dyplenker = useInfotabsDyplenker();
    const dispatch = useDispatch();

    const updateRouterPath = (newTab: INFOTABS) => {
        const path = `${paths.personUri}/${fødselsnummer}/${INFOTABS[newTab].toLowerCase()}/`;
        const newPath = props.history.location.pathname !== path;
        if (newPath) {
            ref.current && ref.current.focus();
            props.history.push(path);
        }
        dispatch(toggleVisittkort(false));
    };

    const openTab = getOpenTabFromRouterPath(props.history.location.pathname);
    return (
        <ErrorBoundary boundaryName="InfoTabs">
            <Section role="region" aria-label="Info-tabs">
                <HandleInfotabsHotkeys />
                <h2 className="visually-hidden">Tab-panel</h2>
                <TabKnapper onTabChange={updateRouterPath} openTab={openTab} />
                <OpenTab>
                    <h2 ref={ref} tabIndex={-1} className="sr-only">
                        {openTab}
                    </h2>
                    <Switch location={props.location}>
                        <Route path={dyplenker.utbetaling.route} component={UtbetalingerContainer} />
                        <Route path={paths.oppfolging} component={OppfolgingContainer} />
                        <Route path={dyplenker.meldinger.route} component={MeldingerContainer} />
                        <Route path={dyplenker.saker.route} component={SaksoversiktContainer} />
                        <Route path={paths.ytelser} component={YtelserContainer} />
                        <Route path={paths.varsler} component={VarslerContainer} />
                        <Route path={''} component={Oversikt} />
                    </Switch>
                </OpenTab>
            </Section>
        </ErrorBoundary>
    );
}

export default withRouter(InfoTabs);
