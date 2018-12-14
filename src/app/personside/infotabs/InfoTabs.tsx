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
            .includes(infoTab));
    return openTab || INFOTABS.OVERSIKT;
}

class InfoTabs extends React.PureComponent<Props> {

    constructor(props: Props) {
        super(props);
        this.onTabChange = this.onTabChange.bind(this);
    }

    updateRouterPath(newTab: INFOTABS) {
        const fødselsnummer = (this.props.personRespons as Person).fødselsnummer;
        this.props.history.push(`${paths.personUri}/${fødselsnummer}/${INFOTABS[newTab].toLowerCase()}/`);
    }

    onTabChange(newTab: INFOTABS) {
        this.updateRouterPath(newTab);
        this.forceUpdate();
    }

    render() {
        const fødselsnummer = (this.props.personRespons as Person).fødselsnummer;

        const UtbetalingerWithProps = () => <UtbetalingerContainer fødselsnummer={fødselsnummer}/>;
        const OversiktWithProps = () => <ComponentPlaceholder height={'500px'} name={'Oversikt'} hue={0}/>;
        const OppfolgingWithProps = () => <ComponentPlaceholder height={'600px'} name={'Oppfølging'} hue={30}/>;
        const MeldingerWithProps = () => <ComponentPlaceholder height={'700px'} name={'Meldinger'} hue={150}/>;
        const SakerWithProps = () => <SaksoversiktContainer fødselsnummer={fødselsnummer}/>;
        const YtelserWithProps = () => <YtelserContainer fødselsnummer={fødselsnummer}/>;

        const basePath = paths.personUri + '/:fodselsnummer/';

        return (
            <ErrorBoundary boundaryName="InfoTabs">
                <Section role="region" aria-label="Info-tabs">
                    <TabKnapper
                        onTabChange={this.onTabChange}
                        openTab={getOpenTabFromRouterPath(this.props.history.location.pathname)}
                    />
                    <OpenTab>
                        <Switch location={this.props.history.location}>
                            <Route path={basePath + INFOTABS.UTBETALING + '/'} component={UtbetalingerWithProps}/>
                            <Route path={basePath + INFOTABS.OPPFOLGING + '/'} component={OppfolgingWithProps}/>
                            <Route path={basePath + INFOTABS.MELDINGER + '/'} component={MeldingerWithProps}/>
                            <Route path={basePath + INFOTABS.SAKER + '/'} component={SakerWithProps}/>
                            <Route path={basePath + INFOTABS.YTELSER + '/'} component={YtelserWithProps}/>
                            <Route component={OversiktWithProps}/>
                        </Switch>
                    </OpenTab>
                </Section>
            </ErrorBoundary>
        );
    }
}

export default withRouter(InfoTabs);
