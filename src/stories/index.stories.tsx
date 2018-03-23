import * as React from 'react';

import { storiesOf } from '@storybook/react';
import Visittkort from '../components/visittkort/Visittkort';
import { Person } from '../models/person';
import MainLayout from '../components/layout/MainLayout';
import ComponentPlaceholder from '../components/component-placeholder/component-placeholder';
import Lameller from '../components/lameller/Lameller';

const mockPerson: Person = {
    fornavn: 'Aremark',
    etternavn: 'Testfamilen',
    fodselsnummer: '10108000398'
};

storiesOf('Visittkort', module).add('Aremark', () => <Visittkort person={mockPerson}/>);

storiesOf('Layout', module)
    .add('HovedLayout', () => (
            <div style={{'height': '100vh', 'display': 'flex'}}>
                <MainLayout/>
            </div>
        )
    );

storiesOf('Component Placeholder', module)
    .add('Placeholder', () => <ComponentPlaceholder height={'100vh'} name={'DialogPanel'} hue={70}/>)
    .add('Mange Placeholdere', () => (
            <div
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
            </div>
        )
    );

storiesOf('Lameller', module).add('Tab Panel med lameller', () => (
        <div style={{'height': '100vh', 'display': 'flex'}}>
            <Lameller/>
        </div>
    )
);
