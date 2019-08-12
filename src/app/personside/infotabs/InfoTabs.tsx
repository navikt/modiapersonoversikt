import * as React from 'react';
import { INFOTABS } from './InfoTabEnum';
import TabKnapper from './TabKnapper';
import styled from 'styled-components';
import UtbetalingerContainer from './utbetalinger/UtbetalingerContainer';
import YtelserContainer from './ytelser/YtelserContainer';
import { paths } from '../../routes/routing';
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

    const updateRouterPath = (newTab: INFOTABS) => {
        const path = `${paths.personUri}/${fødselsnummer}/${INFOTABS[newTab].toLowerCase()}/`;
        const newPath = props.history.location.pathname !== path;
        if (newPath) {
            props.history.push(path);
        }
    };

    const basePath = paths.personUri + '/:fodselsnummer/';
    return (
        <ErrorBoundary boundaryName="InfoTabs">
            <Section role="region" aria-label="Info-tabs">
                <HandleInfotabsHotkeys />
                <h2 className="visually-hidden">Tab-panel</h2>
                <TabKnapper
                    onTabChange={updateRouterPath}
                    openTab={getOpenTabFromRouterPath(props.history.location.pathname)}
                />
                <OpenTab>
                    <Switch location={props.location}>
                        <Route
                            path={basePath + INFOTABS.UTBETALING + '/'}
                            component={() => <UtbetalingerContainer />}
                        />
                        <Route path={basePath + INFOTABS.OPPFOLGING + '/'} component={() => <OppfolgingContainer />} />
                        <Route path={basePath + INFOTABS.MELDINGER + '/'} component={() => <MeldingerContainer />} />
                        <Route path={basePath + INFOTABS.SAKER + '/'} component={() => <SaksoversiktContainer />} />
                        <Route path={basePath + INFOTABS.YTELSER + '/'} component={() => <YtelserContainer />} />
                        <Route path={basePath + INFOTABS.VARSEL + '/'} component={() => <VarslerContainer />} />
                        <Route path={basePath + INFOTABS.OVERSIKT + '/'} component={Oversikt} />
                    </Switch>
                </OpenTab>
            </Section>
        </ErrorBoundary>
    );
}

export default withRouter(InfoTabs);
