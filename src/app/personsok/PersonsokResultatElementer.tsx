import * as React from 'react';
import { Brukerinfo, NorskIdent, PersonsokResponse } from '../../models/person/personsok';
import { Normaltekst } from 'nav-frontend-typografi';
import { Navn } from '../../models/person/person';
import { Kodeverk } from '../../models/kodeverk';

export function IdentCelle(props: { ident: NorskIdent }) {
    return <Normaltekst>{props.ident.ident}</Normaltekst>;
}

export function NavnCelle(props: { navn: Navn; status: Kodeverk }) {
    return <Normaltekst>{formatterNavn(props.navn, props.status)}</Normaltekst>;
}

export function AdresseCelle({ response }: { response: PersonsokResponse }) {
    if (
        !(response.brukerinfo && response.brukerinfo.midlertidigPostadresse) &&
        !response.postadresse &&
        !response.bostedsadresse
    ) {
        return <Normaltekst>Ingen registrert adresse</Normaltekst>;
    }

    return (
        <div>
            <MidlertidigAdresseCelle brukerinfo={response.brukerinfo} />
            <PostadresseCelle postadresse={response.postadresse} />
            <BostedsadresseCelle bostedsadresse={response.bostedsadresse} />
        </div>
    );
}

function MidlertidigAdresseCelle(props: { brukerinfo: Brukerinfo | null }) {
    if (props.brukerinfo && props.brukerinfo.midlertidigPostadresse) {
        const celletekst = `(M) ${props.brukerinfo.midlertidigPostadresse}`;
        return <Normaltekst>{celletekst}</Normaltekst>;
    } else {
        return null;
    }
}

function PostadresseCelle(props: { postadresse: string | null }) {
    if (props.postadresse) {
        const celletekst = `(P) ${props.postadresse}`;
        return <Normaltekst>{celletekst}</Normaltekst>;
    } else {
        return null;
    }
}

function BostedsadresseCelle(props: { bostedsadresse: string | null }) {
    if (props.bostedsadresse) {
        const celletekst = `(B) ${props.bostedsadresse}`;
        return <Normaltekst>{celletekst}</Normaltekst>;
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
