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
import { useSelector } from 'react-redux';
import { AppState } from '../../../redux/reducers';
import HandleInfotabsHotkeys from './HandleInfotabsHotkeys';
import { useInfotabsDyplenker } from './dyplenker';

type Props = RouteComponentProps<{}>;

const OpenTab = styled.div`
    margin-top: ${theme.margin.px20};
    display: flex;
    flex-direction: column;
    flex-grow: 1;
`;

const Section = styled.section`
    margin-top: ${theme.margin.layout};
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

    const updateRouterPath = (newTab: INFOTABS) => {
        const path = `${paths.personUri}/${fødselsnummer}/${INFOTABS[newTab].toLowerCase()}/`;
        const newPath = props.history.location.pathname !== path;
        if (newPath) {
            ref.current && ref.current.focus();
            props.history.push(path);
        }
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
                        <Route path={paths.saker} component={SaksoversiktContainer} />
                        <Route path={paths.ytelser} component={YtelserContainer} />
                        <Route path={paths.varsler} component={VarslerContainer} />
                        <Route path={[paths.oversikt, '']} component={Oversikt} />
                    </Switch>
                </OpenTab>
            </Section>
        </ErrorBoundary>
    );
}

export default withRouter(InfoTabs);
