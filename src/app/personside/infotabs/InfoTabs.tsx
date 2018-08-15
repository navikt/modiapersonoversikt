import * as React from 'react';
import { INFOTABS } from './InfoTabEnum';
import TabKnapper from './TabKnapper';
import ComponentPlaceholder from '../../../components/component-placeholder/ComponentPlaceHolder';
import styled from 'styled-components';
import UtbetalingerContainer from './utbetalinger/UtbetalingerContainer';
import YtelserContainer from './ytelser/YtelserContainer';

interface InfoTabsProps {
    fødselsnummer: string;
}

interface InfoTabsState {
    openTab: INFOTABS;
}

const InfoTabPanel = styled.article`
`;

const OpenTab = styled.div`
  margin-top: 0.5em;
`;

class InfoTabs extends React.PureComponent<InfoTabsProps, InfoTabsState> {

    constructor(props: InfoTabsProps) {
        super(props);
        this.state = {openTab: INFOTABS.UTBETALING};
        this.onTabChange = this.onTabChange.bind(this);
    }

    onTabChange(newTab: INFOTABS) {
        this.setState({
            openTab: INFOTABS[newTab]
        });
    }

    getOpenInfoTab() {
        switch (this.state.openTab) {
            case INFOTABS.OVERSIKT:
                return <ComponentPlaceholder height={'500px'} name={'Oversikt'} hue={0}/>;
            case INFOTABS.OPPFOLGING:
                return <ComponentPlaceholder height={'600px'} name={'Oppfølging'} hue={30}/>;
            case INFOTABS.MELDINGER:
                return <ComponentPlaceholder height={'700px'} name={'Meldinger'} hue={150}/>;
            case INFOTABS.UTBETALING:
                return <UtbetalingerContainer fødselsnummer={this.props.fødselsnummer}/>;
            case INFOTABS.SAKER:
                return <ComponentPlaceholder height={'800px'} name={'Saker'} hue={300}/>;
            case INFOTABS.YTELSER:
                return <YtelserContainer fødselsnummer={this.props.fødselsnummer}/>;
            default:
                return <div>Ikke implementert</div>;
        }
    }

    render() {
        return (
            <InfoTabPanel>
                <TabKnapper onTabChange={this.onTabChange} openTab={this.state.openTab}/>
                <OpenTab>
                    {this.getOpenInfoTab()}
                </OpenTab>
            </InfoTabPanel>
        );
    }
}

export default InfoTabs;
