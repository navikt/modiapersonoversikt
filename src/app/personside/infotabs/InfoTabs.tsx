import * as React from 'react';
import { INFOTABS } from './InfoTabEnum';
import TabPanel from './TabPanel';
import ComponentPlaceholder from '../../../components/component-placeholder/ComponentPlaceHolder';
import styled from 'styled-components';
import UtbetalingerContainer from './utbetalinger/utbetalingerContainer';

interface InfoTabsProps {
    fødselsnummer: string;
}

interface InfoTabsState {
    openTab: INFOTABS;
}

const InfoTabPanel = styled.article`
  padding: 1em;
`;

const InfoTab = styled.div`
  margin-top: 0.2em;
`;

class InfoTabs extends React.PureComponent<InfoTabsProps, InfoTabsState> {

    constructor(props: InfoTabsProps) {
        super(props);
        this.state = {openTab: INFOTABS.OVERSIKT};
        this.onTabChange = this.onTabChange.bind(this);
    }

    onTabChange(newTab: INFOTABS) {
        this.setState({
            openTab: INFOTABS[newTab]
        });
    }

    getOpenInfoTab() {
        switch (this.state.openTab) {
            case INFOTABS.INNBOKS:
                return <ComponentPlaceholder height={'600px'} name={'Innboks'} hue={30}/>;
            case INFOTABS.OVERSIKT:
                return <ComponentPlaceholder height={'500px'} name={'Oversikt'} hue={0}/>;
            case INFOTABS.PLEIEPENGER:
                return <ComponentPlaceholder height={'800px'} name={'Pleiepenger'} hue={300}/>;
            case INFOTABS.SAKSOVERSIKT:
                return <ComponentPlaceholder height={'700px'} name={'Saksoversikt'} hue={150}/>;
            case INFOTABS.UTBETALINGER:
                return <UtbetalingerContainer fødselsnummer={this.props.fødselsnummer}/>;
            default:
                return <div>Ikke implementert</div>;
        }
    }

    render() {
        return (
            <InfoTabPanel>
                <TabPanel onTabChange={this.onTabChange} openTab={this.state.openTab}/>
                <InfoTab>
                    {this.getOpenInfoTab()}
                </InfoTab>
            </InfoTabPanel>
        );
    }
}

export default InfoTabs;
