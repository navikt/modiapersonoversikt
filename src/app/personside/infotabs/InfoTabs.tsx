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
import OppfolgingContainer from './oppfolging/OppfolgingContainer';
import VarslerContainer from './varsel/VarslerContainer';
import MeldingerContainer from './meldinger/MeldingerContainer';
import Oversikt from './oversikt/Oversikt';
import { useInfotabsDyplenker } from './dyplenker';
import { useFødselsnummer } from '../../../utils/customHooks';
import { useDispatch } from 'react-redux';
import { toggleVisittkort } from '../../../redux/uiReducers/UIReducer';
import HandleInfotabsHotkeys from './HandleInfotabsHotkeys';

type Props = RouteComponentProps<{}>;

const OpenTab = styled.div`
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    overflow-y: auto;
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
    const fødselsnummer = useFødselsnummer();
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
            <HandleInfotabsHotkeys />
            <TabKnapper openTab={openTab} onTabChange={updateRouterPath} />
            <ErrorBoundary boundaryName={'OpenTab'}>
                <OpenTab>
                    <h2 ref={ref} tabIndex={-1} className="sr-only">
                        {openTab}
                    </h2>
                    <Switch location={props.location}>
                        <Route path={dyplenker.utbetaling.route} component={UtbetalingerContainer} />
                        <Route path={paths.oppfolging} component={OppfolgingContainer} />
                        <Route path={dyplenker.meldinger.route} component={MeldingerContainer} />
                        <Route path={dyplenker.saker.route} component={SaksoversiktContainer} />
                        <Route path={dyplenker.ytelser.route} component={YtelserContainer} />
                        <Route path={paths.varsler} component={VarslerContainer} />
                        <Route path={''} component={Oversikt} />
                    </Switch>
                </OpenTab>
            </ErrorBoundary>
        </ErrorBoundary>
    );
}

export default withRouter(InfoTabs);
