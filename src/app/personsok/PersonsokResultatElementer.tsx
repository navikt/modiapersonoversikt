import * as React from 'react';
import { Brukerinfo, NorskIdent } from '../../models/person/personsok';
import { Normaltekst } from 'nav-frontend-typografi';
import { Navn } from '../../models/person/person';
import { Kodeverk } from '../../models/kodeverk';

export function IdentCelle(props: { ident: NorskIdent }) {
    return <Normaltekst>{props.ident.ident}</Normaltekst>;
}

export function NavnCelle(props: { navn: Navn; status: Kodeverk }) {
    return <Normaltekst>{formatterNavn(props.navn, props.status)}</Normaltekst>;
}

export function MidlertidigAdresseCelle(props: { brukerinfo: Brukerinfo | null }) {
    if (props.brukerinfo && props.brukerinfo.midlertidigPostadresse) {
        return <Normaltekst>{props.brukerinfo.midlertidigPostadresse}</Normaltekst>;
    } else {
        return null;
    }
}

export function PostadresseCelle(props: { postadresse: string | null }) {
    if (props.postadresse) {
        return <Normaltekst>{props.postadresse}</Normaltekst>;
    } else {
        return null;
    }
}

export function BostedsadresseCelle(props: { bostedsadresse: string | null }) {
    if (props.bostedsadresse) {
        return <Normaltekst>{props.bostedsadresse}</Normaltekst>;
    } else {
        return null;
    }
}

export function BostedCelle(props: { brukerinfo: Brukerinfo | null }) {
    if (props.brukerinfo) {
        return <Normaltekst>{props.brukerinfo.ansvarligEnhet}</Normaltekst>;
    } else {
        return null;
    }
}

function formatterNavn(navn: Navn, status: Kodeverk) {
    let personNavn = navn.etternavn + ', ' + navn.fornavn + formatNullableString(navn.mellomnavn, true);
    if (status.beskrivelse === 'DØD') {
        personNavn += ' (død)';
    }
    return personNavn;
}

function formatNullableString(str: string | null, prefixWithSpace?: boolean) {
    return str ? (prefixWithSpace ? ' ' : '' + str) : '';
}
