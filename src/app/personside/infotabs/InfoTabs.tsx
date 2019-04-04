import * as React from 'react';
import { INFOTABS } from './InfoTabEnum';
import TabKnapper from './TabKnapper';
import ComponentPlaceholder from '../../../components/component-placeholder/ComponentPlaceHolder';
import styled from 'styled-components';
import UtbetalingerContainer from './utbetalinger/UtbetalingerContainer';
import YtelserContainer from './ytelser/YtelserContainer';
import { paths } from '../../routes/routing';
import { Route, RouteComponentProps, Switch } from 'react-router';
import { withRouter } from 'react-router-dom';
import SaksoversiktContainer from './saksoversikt/SaksoversiktContainer';
import ErrorBoundary from '../../../components/ErrorBoundary';
import { Person, PersonRespons } from '../../../models/person/person';
import theme from '../../../styles/personOversiktTheme';
import OppfolgingContainer from './oppfolging/OppfolgingContainer';
import VarslerContainer from './varsel/VarslerContainer';
import MeldingerContainer from './meldinger/MeldingerContainer';

interface OwnProps {
    personRespons: PersonRespons;
}

type Props = RouteComponentProps<{}> & OwnProps;

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

class InfoTabs extends React.PureComponent<Props> {
    constructor(props: Props) {
        super(props);
        this.updateRouterPath = this.updateRouterPath.bind(this);
    }

    updateRouterPath(newTab: INFOTABS) {
        const fødselsnummer = (this.props.personRespons as Person).fødselsnummer;
        const path = `${paths.personUri}/${fødselsnummer}/${INFOTABS[newTab].toLowerCase()}/`;
        const newPath = this.props.history.location.pathname !== path;
        if (newPath) {
            this.props.history.push(path);
            this.forceUpdate();
        }
    }

    render() {
        const OversiktWithProps = () => <ComponentPlaceholder height={'500px'} name={'Oversikt'} hue={0} />;

        const basePath = paths.personUri + '/:fodselsnummer/';

        return (
            <ErrorBoundary boundaryName="InfoTabs">
                <Section role="region" aria-label="Info-tabs">
                    <h2 className="visually-hidden">Tab-panel</h2>
                    <TabKnapper
                        onTabChange={this.updateRouterPath}
                        openTab={getOpenTabFromRouterPath(this.props.history.location.pathname)}
                    />
                    <OpenTab>
                        <Switch location={this.props.history.location}>
                            <Route path={basePath + INFOTABS.UTBETALING + '/'} component={UtbetalingerContainer} />
                            <Route path={basePath + INFOTABS.OPPFOLGING + '/'} component={OppfolgingContainer} />
                            <Route path={basePath + INFOTABS.MELDINGER + '/'} component={MeldingerContainer} />
                            <Route path={basePath + INFOTABS.SAKER + '/'} component={SaksoversiktContainer} />
                            <Route path={basePath + INFOTABS.YTELSER + '/'} component={YtelserContainer} />
                            <Route path={basePath + INFOTABS.VARSEL + '/'} component={VarslerContainer} />
                            <Route component={OversiktWithProps} />
                        </Switch>
                    </OpenTab>
                </Section>
            </ErrorBoundary>
        );
    }
}

export default withRouter(InfoTabs);
