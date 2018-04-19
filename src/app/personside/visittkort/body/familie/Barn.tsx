import * as React from 'react';

import VisittkortElement from '../VisittkortElement';
import Undertekst from 'nav-frontend-typografi/lib/undertekst';

const jentePath = require('../../../../../resources/svg/jentebarn.svg');
const guttPath = require('../../../../../resources/svg/guttebarn.svg');

function Barn() {
    return (
        <>
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

export default Barn;