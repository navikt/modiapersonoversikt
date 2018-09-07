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

interface OwnProps {
    fødselsnummer: string;
}

type Props = RouteComponentProps<{}> & OwnProps;

const OpenTab = styled.div`
  margin-top: 0.5em;
`;

class InfoTabs extends React.PureComponent<Props> {

    constructor(props: Props) {
        super(props);
        this.onTabChange = this.onTabChange.bind(this);
    }

    getOpenTabFromUrl(): INFOTABS {
        const currentPathName = this.props.history.location.pathname;
        const infoTabs: INFOTABS[] = Object.keys(INFOTABS).map(key => INFOTABS[key]);
        const openTab: INFOTABS | undefined = infoTabs.find((infoTab: string) =>
            currentPathName
                    .toUpperCase()
                    .split('/')
                    .includes(infoTab));
        return openTab || INFOTABS.OVERSIKT;
    }

    updateRouterPath(newTab: INFOTABS) {
        this.props.history.push(`${paths.personUri}/${this.props.fødselsnummer}/${INFOTABS[newTab].toLowerCase()}/`);
    }

    onTabChange(newTab: INFOTABS) {
        this.updateRouterPath(newTab);
        this.forceUpdate();
    }

    render() {
        const UtbetalingerWithProps = () => <UtbetalingerContainer fødselsnummer={this.props.fødselsnummer}/>;
        const OversiktWithProps = () => <ComponentPlaceholder height={'500px'} name={'Oversikt'} hue={0}/>;
        const OppfolgingWithProps = () => <ComponentPlaceholder height={'600px'} name={'Oppfølging'} hue={30}/>;
        const MeldingerWithProps = () => <ComponentPlaceholder height={'700px'} name={'Meldinger'} hue={150}/>;
        const SakerWithProps = () => <ComponentPlaceholder height={'800px'} name={'Saker'} hue={300}/>;
        const YtelserWithProps = () => <YtelserContainer fødselsnummer={this.props.fødselsnummer}/>;

        const basePath = paths.personUri + '/:fodselsnummer/';

        return (
            <section>
                <TabKnapper onTabChange={this.onTabChange} openTab={this.getOpenTabFromUrl()}/>
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
            </section>
        );
    }
}

export default withRouter(InfoTabs);
