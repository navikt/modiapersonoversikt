import * as React from 'react';
import { connect } from 'react-redux';
import Visittkort from './Visittkort';

function VisittkortContainer () {
    const person = {
        fornavn: 'Test',
        etternavn: 'Testesen',
        fodselsnummer: '10108000498'
    };
    return <Visittkort person={person}/>;
}

export default connect(null, null)(VisittkortContainer);