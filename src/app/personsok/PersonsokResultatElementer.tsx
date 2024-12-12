import { Normaltekst } from 'nav-frontend-typografi';
import type { Kodeverk } from '../../models/kodeverk';
import type { Brukerinfo, Navn, NorskIdent, PersonsokResponse, UtenlandskID } from '../../models/person/personsok';

export function IdentCelle(props: { ident: NorskIdent }) {
    return <Normaltekst>{props.ident.ident}</Normaltekst>;
}

export function NavnCelle(props: { navn: Navn; status?: Kodeverk | null }) {
    return <Normaltekst>{formatterNavn(props.navn, props.status)}</Normaltekst>;
}

export function AdresseCelle({ response }: { response: PersonsokResponse }) {
    if (!response.brukerinfo?.midlertidigPostadresse && !response.postadresse && !response.bostedsadresse) {
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
    if (props.brukerinfo?.midlertidigPostadresse) {
        const celletekst = `(M) ${props.brukerinfo.midlertidigPostadresse}`;
        return <Normaltekst>{celletekst}</Normaltekst>;
    }
    return null;
}

function PostadresseCelle(props: { postadresse: string | null }) {
    if (props.postadresse) {
        const celletekst = `(P) ${props.postadresse}`;
        return <Normaltekst>{celletekst}</Normaltekst>;
    }
    return null;
}

function BostedsadresseCelle(props: { bostedsadresse: string | null }) {
    if (props.bostedsadresse) {
        const celletekst = `(B) ${props.bostedsadresse}`;
        return <Normaltekst>{celletekst}</Normaltekst>;
    }
    return null;
}

export function BostedCelle(props: { brukerinfo: Brukerinfo | null }) {
    if (props.brukerinfo?.ansvarligEnhet) {
        return <Normaltekst>{props.brukerinfo.ansvarligEnhet}</Normaltekst>;
    }
    return null;
}

export function UtenlandskIDCelle(props: { utenlandskID: UtenlandskID[] | null }) {
    const harUtenlandskID = props.utenlandskID?.some(
        (utenlandskID) => utenlandskID.identifikasjonsnummer !== undefined
    );
    if (harUtenlandskID) {
        const celletekst = props.utenlandskID?.map((utenlandskID) => {
            const celletekst = `(${utenlandskID.utstederland}) ${utenlandskID.identifikasjonsnummer} `;
            return <Normaltekst key={utenlandskID.identifikasjonsnummer}>{celletekst}</Normaltekst>;
        });
        return <div>{celletekst}</div>;
    }
    return null;
}

function formatterNavn(navn: Navn, status?: Kodeverk | null) {
    let personNavn = `${navn.etternavn}, ${navn.fornavn}${formatNullableString(navn.mellomnavn, true)}`;
    if (status?.beskrivelse === 'DØD') {
        personNavn += ' (død)';
    }
    return personNavn;
}

function formatNullableString(str: string | null, prefixWithSpace?: boolean) {
    return str ? (prefixWithSpace ? ' ' : `${str}`) : '';
}
