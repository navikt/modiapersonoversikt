import * as React from 'react';
import { INFOTABS } from './InfoTabEnum';
import TabPanel from './TabPanel';
import ComponentPlaceholder from '../../../components/component-placeholder/ComponentPlaceHolder';
import styled from 'styled-components';

interface InfoTabsProps {
}

interface InfoTabsState {
    openTab: INFOTABS;
}

const dummypaneler = {
    Oversikt: <ComponentPlaceholder height={'500px'} name={'Oversikt'} hue={0} />,
    Innboks: <ComponentPlaceholder height={'600px'} name={'Innboks'} hue={30} />,
    Saksoversikt: <ComponentPlaceholder height={'700px'} name={'Saksoversikt'} hue={150} />,
    Utbetalinger: <ComponentPlaceholder height={'550px'} name={'Utbetalinger'} hue={210} />,
    Pleiepenger: <ComponentPlaceholder height={'800px'} name={'Pleiepenger'} hue={300} />
};

const InfoTabPanel = styled.article`
        `;

const InfoTab = styled.div`
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

    render() {
        return (
            <InfoTabPanel>
                <TabPanel onTabChange={this.onTabChange} openTab={this.state.openTab} />
                <InfoTab>
                    {dummypaneler[this.state.openTab]}
                </InfoTab>
            </InfoTabPanel>
        );
    }
}

export default InfoTabs;
