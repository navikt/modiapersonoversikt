import * as React from 'react';

import { storiesOf } from '@storybook/react';
import Visittkort from '../components/visittkort/Visittkort';
import { Person } from '../models/person';
import ComponentPlaceholder from '../components/component-placeholder/component-placeholder';

const mockPerson: Person = {
    fornavn: 'Aremark',
    etternavn: 'Testfamilen',
    fodselsnummer: '10108000398'
};

storiesOf('Visittkort', module).add('Aremark', () => <Visittkort person={mockPerson}/>);

storiesOf('Component Placeholder', module)
    .add('Placeholder', () => <ComponentPlaceholder height={'100vh'} name={'DialogPanel'}/>)
    .add('Mange Placeholdere', () => (
            <div
                style={{
                    'display': 'grid',
                    'grid-template-columns': '1fr 1fr 2fr',
                    'grid-auto-rows': '30vw',
                    'grid-gap': '1vw',
                    'padding': '1vw'
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
