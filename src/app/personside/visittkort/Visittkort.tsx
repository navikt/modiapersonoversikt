import * as React from 'react';
import { Person } from '../../../models/person';

import { EkspanderbartpanelBase } from 'nav-frontend-ekspanderbartpanel';
import VisittkortHeader from './header/VisittkortHeader';
import VisittkortBody from './body/VisittkortBody';

interface VisittkortProps {
    person: Person;
}

function Visittkort({ person }: VisittkortProps) {

    const visittkortheader = <VisittkortHeader person={person}/>;

    return (
        <article>
            <EkspanderbartpanelBase apen={false} heading={visittkortheader} ariaTittel="Visittkort">
                <VisittkortBody person={person}/>
            </EkspanderbartpanelBase>
        </article>
    );
}

export default Visittkort;
