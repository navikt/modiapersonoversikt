import * as React from 'react';

import Undertekst from 'nav-frontend-typografi/lib/undertekst';
import VisittkortElement from '../VisittkortElement';
import Sivilstand from './Sivilstand';
import { Person } from '../../../../../models/person';

const jentePath = require('../../../../../resources/svg/jentebarn.svg');
const guttPath = require('../../../../../resources/svg/guttebarn.svg');

interface Props {
    person: Person;
}

function Familie({person}: Props) {
    return (
        <>
            <Sivilstand person={person}/>
            <VisittkortElement beskrivelse="Jente" ikonPath={jentePath}>
                <Undertekst>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                </Undertekst>
            </VisittkortElement>
            <VisittkortElement beskrivelse="Gutt" ikonPath={guttPath}>
                <Undertekst>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                </Undertekst>
            </VisittkortElement>
        </>
    );
}

export default Familie;