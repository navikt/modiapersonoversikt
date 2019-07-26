import * as React from 'react';
import { Brukerinfo, NorskIdent, StrukturertAdresse, UstrukturertAdresse } from '../../models/person/personsok';
import Normaltekst from 'nav-frontend-typografi/lib/normaltekst';
import { Navn } from '../../models/person/person';

export function IdentCelle(props: { ident: NorskIdent }) {
    return <Normaltekst>{props.ident.ident}</Normaltekst>;
}

export function NavnCelle(props: { navn: Navn }) {
    return <Normaltekst>{formatterNavn(props.navn)}</Normaltekst>;
}

export function MidlertidigAdresseCelle(props: { brukerinfo: Brukerinfo | null }) {
    if (props.brukerinfo && props.brukerinfo.midlertidigPostadresse) {
        return (
            <Normaltekst>
                {formatterUstrukturertAdresse(props.brukerinfo.midlertidigPostadresse.ustrukturertAdresse)}
            </Normaltekst>
        );
    } else {
        return null;
    }
}

export function PostadresseCelle(props: { postadresse: UstrukturertAdresse | null }) {
    if (props.postadresse) {
        return <Normaltekst>{formatterUstrukturertAdresse(props.postadresse)}</Normaltekst>;
    } else {
        return null;
    }
}

export function BostedsadresseCelle(props: { bostedsadresse: StrukturertAdresse | null }) {
    if (props.bostedsadresse) {
        return <Normaltekst>{formatterStrukturertAdresse(props.bostedsadresse)}</Normaltekst>;
    } else {
        return null;
    }
}

export function BostedCelle() {
    return <Normaltekst>Finn ut</Normaltekst>;
}

function formatterNavn(navn: Navn) {
    return navn.etternavn + ', ' + navn.fornavn + formatNullableString(navn.mellomnavn, true);
}

function formatterUstrukturertAdresse(adresse: UstrukturertAdresse) {
    return (
        formatNullableString(adresse.adresselinje1) +
        formatNullableString(adresse.adresselinje2, true) +
        formatNullableString(adresse.adresselinje3, true) +
        formatNullableString(adresse.adresselinje4, true)
    );
}

function formatterStrukturertAdresse(adresse: StrukturertAdresse) {
    return adresse.tilleggsadresse;
}

function formatNullableString(str: string | null, prefixWithSpace?: boolean) {
    return str ? (prefixWithSpace ? ' ' : '' + str) : '';
}
