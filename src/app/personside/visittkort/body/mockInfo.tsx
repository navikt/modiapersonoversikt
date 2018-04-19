import * as React from 'react';
import VisittkortElement from './VisittkortElement';
import Undertekst from 'nav-frontend-typografi/lib/undertekst';

const locationPath = require('../../../../resources/svg/location-pin.svg');

export function AdressePlaceholder() {
    return (
        <>
            <VisittkortElement beskrivelse="Postadresse Folkeregistrert" ikonPath={locationPath}>
                <Undertekst>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Facilis neque nobis sint tempora. Quos, tenetur!
                </Undertekst>
            </VisittkortElement>
            <VisittkortElement beskrivelse="Postadresse Midlertidig Norge" ikonPath={locationPath}>
                <Undertekst>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Et, ipsum.
                </Undertekst>
            </VisittkortElement>
        </>
    );
}

export const VergeMålPlaceholder = (
    <>
        <VisittkortElement beskrivelse="Bruker er under vergemål" ikonPath={locationPath}>
            <Undertekst>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Facilis neque nobis sint tempora. Quos, tenetur!
            </Undertekst>
        </VisittkortElement>
    </>
);

export const SikkerhetstiltakPlaceholder = (
    <>
        <VisittkortElement beskrivelse="Sikkerhetstiltak" ikonPath={locationPath}>
            <Undertekst>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Facilis neque nobis sint tempora. Quos, tenetur!
            </Undertekst>
        </VisittkortElement>
    </>
);
