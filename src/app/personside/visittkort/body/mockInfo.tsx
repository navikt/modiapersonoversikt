import * as React from 'react';
import VisittkortElement from './VisittkortElement';
import Undertekst from 'nav-frontend-typografi/lib/undertekst';

const vergemålIkon = require('./vergemaal.svg');
const sikkerhetsTiltakIkon = require('./sikkerhetstiltak.svg');

export const VergeMålPlaceholder = (
    <VisittkortElement beskrivelse="Bruker er under vergemål" ikonPath={vergemålIkon}>
        <Undertekst>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            Facilis neque nobis sint tempora. Quos, tenetur!
        </Undertekst>
    </VisittkortElement>
);

export const SikkerhetstiltakPlaceholder = (
    <VisittkortElement beskrivelse="Sikkerhetstiltak" ikonPath={sikkerhetsTiltakIkon}>
        <Undertekst>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            Facilis neque nobis sint tempora. Quos, tenetur!
        </Undertekst>
    </VisittkortElement>
);
