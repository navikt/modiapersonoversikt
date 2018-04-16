import * as React from 'react';
import styled from 'styled-components';
import { Component } from 'react';
import ComponentPlaceholder from '../../components/component-placeholder/ComponentPlaceHolder';

const KontaktInfo = <ComponentPlaceholder key={'Kontaktinfo'} name={'Kontaktinfo'} height={'600px'}/>;
const Familie = <ComponentPlaceholder key={'Familie'} name={'Familie'} height={'450px'}/>;
const NavKontor = <ComponentPlaceholder key={'NavKontor'} name={'NavKontor'} height={'350px'}/>;
const Vergemål = <ComponentPlaceholder key={'Vergemål'} name={'Vergemål'} height={'300px'}/>;
const Sikkerhetstiltak = <ComponentPlaceholder key={'Sikkerhetstiltak'} name={'Sikkerhetstiltak'} height={'200px'}/>;

const Wrapper = styled<{ numberOfColumns: number; }, 'div'>('div')`
  display: flex;
  flex-flow: row nowrap;
  > * {
    flex: 1 1 ${props => 99 / props.numberOfColumns}%;
  }
  > *:not(:last-child) {
    margin-right: 0.5em;
  }
`;

const Column = styled.div`
  > * {
    margin-bottom: 0.5em;
  }
`;

const oneColumnLayout = (
    <Column>
        {KontaktInfo}
        {Familie}
        {NavKontor}
        {Vergemål}
        {Sikkerhetstiltak}
    </Column>
);
const twoColumnLayout = (
    <>
        <Column>
            {KontaktInfo}
            {Familie}
        </Column>
        <Column>
            {NavKontor}
            {Vergemål}
            {Sikkerhetstiltak}
        </Column>
    </>
);
const threeColumnLayout = (
    <>
        <Column>
            {KontaktInfo}
        </Column>
        <Column>
            {Familie}
            {Vergemål}
        </Column>
        <Column>
            {NavKontor}
            {Sikkerhetstiltak}
        </Column>
    </>
);
const fourColumnLayout = (
    <>
        <Column>
            {KontaktInfo}
        </Column>
        <Column>
            {Familie}
        </Column>
        <Column>
            {NavKontor}
            {Sikkerhetstiltak}
        </Column>
        <Column>
            {Vergemål}
        </Column>
    </>
);

class JSResponsive extends Component<{}> {

    private node: HTMLDivElement;

    constructor(props: {}) {
        super(props);
    }
    componentDidMount() {
        this.handleResize();
        window.addEventListener('resize', () => this.handleResize());
    }
    componentWillUnmount() {
        window.removeEventListener('resize', () => this.handleResize());
    }
    handleResize() {
        this.forceUpdate();
    }
    getComponentWidth() {
        return this.node ? this.node.clientWidth : 0;
    }
    render() {
        const componentWidth = this.getComponentWidth();
        const numberOfColumns = Math.floor(componentWidth / 300);

        const columnLayOut = function () {
            switch (numberOfColumns) {
                case 0:
                case 1:
                    return oneColumnLayout;
                case 2:
                    return twoColumnLayout;
                case 3:
                    return threeColumnLayout;
                default:
                    return fourColumnLayout;
            }
        }();
        return (
            <Wrapper innerRef={ref => this.node = ref} numberOfColumns={numberOfColumns}>
                {columnLayOut}
            </Wrapper>
        );
    }
}

export default JSResponsive;
