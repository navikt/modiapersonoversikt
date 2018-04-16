import * as React from 'react';
import VisittkortElement from './VisittkortElement';
import Undertekst from 'nav-frontend-typografi/lib/undertekst';

const heartPath = require('../../../../resources/svg/heart.svg');
const locationPath = require('../../../../resources/svg/location-pin.svg');
const jentePath = require('../../../../resources/svg/jentebarn.svg');
const guttPath = require('../../../../resources/svg/guttebarn.svg');

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

export function FamiliePlaceholder() {
    return (
        <>
            <VisittkortElement beskrivelse="Sivilstand" ikonPath={heartPath}>
                <Undertekst>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Adipisci dignissimos eius modi natus praesentium unde velit.
                </Undertekst>
            </VisittkortElement>
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
