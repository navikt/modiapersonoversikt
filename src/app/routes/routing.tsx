import * as React from 'react';
import { withRouter } from 'react-router-dom';
import { Route, RouteComponentProps, Switch } from 'react-router';
import { History } from 'history';
import Startbilde from '../startbilde/Startbilde';
import Brukerprofilside from '../brukerprofil/BrukerprofilSide';
import SaksoversiktMicroFrontend from '../personside/infotabs/saksoversikt/SaksoversiktMicroFrontend';
import Personside from '../personside/Personside';
import { useFødselsnummer } from '../../utils/customHooks';
import { INFOTABS } from '../personside/infotabs/InfoTabEnum';
import { useCallback, useMemo } from 'react';

export const paths = {
    personUri: '/modiapersonoversikt/person',
    saksoversikt: '/modiapersonoversikt/saker',
    brukerprofil: '/modiapersonoversikt/brukerprofil',
    basePath: '/modiapersonoversikt',
    standaloneKomponenter: '/modiapersonoversikt/components',
    legacyPersonPath: '/modiabrukerdialog/person',
    legacyBrukerprofil: '#!brukerprofil'
};

export function usePaths() {
    const fnr = useFødselsnummer();

    const getPath = useCallback(
        (tab: INFOTABS) => {
            return `${paths.personUri}/${fnr}/${tab.toLowerCase()}`;
        },
        [fnr]
    );

    return useMemo(
        () => ({
            ...paths,
            oversikt: getPath(INFOTABS.OVERSIKT),
            oppfolging: getPath(INFOTABS.OPPFOLGING),
            meldinger: getPath(INFOTABS.MELDINGER),
            utbetlainger: getPath(INFOTABS.UTBETALING),
            saker: getPath(INFOTABS.SAKER),
            ytelser: getPath(INFOTABS.YTELSER),
            varsler: getPath(INFOTABS.VARSEL)
        }),
        [getPath]
    );
}

interface RouterProps {
    fodselsnummer: string;
}

type Props = RouteComponentProps<RouterProps>;

function Routing(props: Props) {
    return (
        <Switch location={props.location}>
            <Route path={`${paths.personUri}/:fodselsnummer/`} component={Personside} />
            <Route
                path={`${paths.saksoversikt}/:fodselsnummer/`}
                render={routeProps => (
                    <SaksoversiktMicroFrontend
                        fødselsnummer={routeProps.match.params.fodselsnummer}
                        queryParamString={routeProps.location.search}
                    />
                )}
            />
            <Route path={`${paths.brukerprofil}/:fodselsnummer/`} component={() => <Brukerprofilside />} />
            <Route component={Startbilde} />
        </Switch>
    );
}

export function setNyBrukerIPath(history: History, fødselsnummer: string) {
    history.push(`${paths.personUri}/${fødselsnummer}`);
}

export function fjernBrukerFraPath(history: History) {
    history.push(`${paths.basePath}`);
}

export default withRouter(Routing);
