import * as React from 'react';

import { storiesOf } from '@storybook/react';
import Visittkort from '../app/personside/visittkort/Visittkort';
import { Person } from '../models/person';
import ComponentPlaceholder from '../components/component-placeholder/ComponentPlaceHolder';
import { aremark } from '../mock/person-mock';
import styled from 'styled-components';
import GridLayout from './grid-layout/GridLayout';
import ResponsiveFlexColumns from './responsive-columns/ResponsiveFlexColumns';
import FloatingChildren from './responsive-columns/FloatingChildren';
import JSResponsive from './responsive-columns/EventListener';

const mockPerson: Person = aremark;

const NiceContainer = styled.div`
  box-shadow: 0 2px 6px rgba(0,0,0,0.5);
`;

storiesOf('Visittkort', module).add('Aremark', () => <NiceContainer><Visittkort person={mockPerson}/></NiceContainer>);

storiesOf('Component Placeholder', module)
    .add('Placeholder', () => <ComponentPlaceholder height={'100vh'} name={'DialogPanel'} hue={70}/>)
    .add('Mange Placeholdere', () => (
            <NiceContainer
                style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr 2fr',
                    gridAutoRows: '30vw',
                    gridGap: '1vw',
                    padding: '1vw'
                }}
            >
                <ComponentPlaceholder name={'Komponent 1'}/>
                <ComponentPlaceholder name={'Komponent 2'}/>
                <ComponentPlaceholder name={'Komponent 3'}/>
                <ComponentPlaceholder name={'Komponent 4'}/>
                <ComponentPlaceholder name={'Komponent 5'}/>
                <ComponentPlaceholder name={'Komponent 6'}/>
            </NiceContainer>
        )
    );

storiesOf('Layout', module)
    .add('GridTest, virker ikke i ie11', () => (
        <GridLayout/>
    )).add('Responsive flex-container for visittkortbody (må vite høyden)', () => (
        <ResponsiveFlexColumns/>
    )).add('Responsive floatchildren visittkortbody', () => (
        <FloatingChildren/>
    )).add('Responsive columns with JS eventlistener', () => (
        <JSResponsive/>
));
