import * as React from 'react';
import { LAMELLER } from './LamellEnum';
import LamellTabPanel from './TabPanel';
import ComponentPlaceholder from '../../../components/component-placeholder/ComponentPlaceHolder';
import styled from 'styled-components';

interface LamellerProps {
}

interface LamellerState {
    openTab: LAMELLER;
}

const dummypaneler = {
    Oversikt: <ComponentPlaceholder height={'500px'} name={'Oversikt'} hue={0} />,
    Innboks: <ComponentPlaceholder height={'600px'} name={'Innboks'} hue={30} />,
    Saksoversikt: <ComponentPlaceholder height={'700px'} name={'Saksoversikt'} hue={150} />,
    Utbetalinger: <ComponentPlaceholder height={'550px'} name={'Utbetalinger'} hue={210} />,
    Pleiepenger: <ComponentPlaceholder height={'800px'} name={'Pleiepenger'} hue={300} />
};

const LamellPanel = styled.article`
        `;

const Lamell = styled.div`
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
