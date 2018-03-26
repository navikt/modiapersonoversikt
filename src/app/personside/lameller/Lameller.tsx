import * as React from 'react';
import { LAMELLER } from './LamellEnum';
import LamellTabPanel from './TabPanel';
import ComponentPlaceholder from '../../../components/component-placeholder/ComponentPlaceHolder';
import styled from 'styled-components';
import Lamell from './Lamell';

interface LamellerProps {
}

interface LamellerState {
    openTab: LAMELLER;
}

const dummypaneler = {
    Oversikt: <ComponentPlaceholder name={'Oversikt'} hue={0} />,
    Innboks: <ComponentPlaceholder name={'Innboks'} hue={30} />,
    Saksoversikt: <ComponentPlaceholder name={'Saksoversikt'} hue={150} />,
    Utbetalinger: <ComponentPlaceholder name={'Utbetalinger'} hue={210} />,
    Pleiepenger: <ComponentPlaceholder name={'Pleiepenger'} hue={300} />
};

const LamellPanel = styled.article`
          display: flex;
          flex-direction: column;
        `;

class Lameller extends React.PureComponent<LamellerProps, LamellerState> {

    constructor(props: LamellerProps) {
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
        return (
            <LamellPanel>
                <LamellTabPanel onTabChange={this.onTabChange} openTab={this.state.openTab} />
                <Lamell>
                    {dummypaneler[this.state.openTab]}
                </Lamell>
            </LamellPanel>
        );
    }
}

export default Lameller;
