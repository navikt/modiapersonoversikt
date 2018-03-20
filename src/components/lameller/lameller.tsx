import * as React from 'react';
import { LAMELLER } from './lamell-enum';
import TabPanelView from './lamell-tab-panel';
import ComponentPlaceholder from '../component-placeholder/component-placeholder';
import styled from 'styled-components';

interface PropsInterface {
}

interface StateInterface {
    openTab: LAMELLER;
}

const dummypaneler = {
    Oversikt: <ComponentPlaceholder name={'Oversikt'} hue={0} />,
    Innboks: <ComponentPlaceholder name={'Innboks'} hue={30} />,
    Saksoversikt: <ComponentPlaceholder name={'Saksoversikt'} hue={150} />,
    Utbetalinger: <ComponentPlaceholder name={'Utbetalinger'} hue={210} />,
    Pleiepenger: <ComponentPlaceholder name={'Pleiepenger'} hue={300} />
};

class Lameller extends React.PureComponent<PropsInterface, StateInterface> {

    constructor(props: PropsInterface) {
        super(props);
        this.state = {openTab: LAMELLER.OVERSIKT};
        this.onTabChange = this.onTabChange.bind(this);
    }

    onTabChange(newTab: LAMELLER) {
        this.setState({
            openTab: LAMELLER[newTab]
        });
    }

    render() {

        const TabPanel = styled.div`
          display: flex;
          flex-direction: column;
        `;

        const Lamell = styled.div`
            flex-grow: 1;
            display: flex;
            flex-direction: column;
            padding: 1%;
            min-height: 400px;
            > * {
              flex-grow: 1;
            }
        `;

        return (
            <TabPanel>
                <TabPanelView onTabChange={this.onTabChange} openTab={this.state.openTab} />
                <Lamell>
                    {dummypaneler[this.state.openTab]}
                </Lamell>
            </TabPanel>
        );
    }
}

export default Lameller;
