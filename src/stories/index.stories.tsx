import * as React from 'react';

import { storiesOf } from '@storybook/react';
import Visittkort from '../components/visittkort/Visittkort';
import { Person } from "../models/person";

const mockPerson : Person = {
    fornavn: 'Aremark',
    etternavn: 'Testfamilen',
    fodselsnummer: '10108000398'
};


storiesOf('Visittkort', module).add('Aremark', () => <Visittkort person={mockPerson} />);