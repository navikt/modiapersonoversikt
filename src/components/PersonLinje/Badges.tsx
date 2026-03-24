import { Heading, Tag } from '@navikt/ds-react';
import { usePersonData } from 'src/lib/clients/modiapersonoversikt-api';
import { AdresseBeskyttelseKode, type PersonData } from 'src/lib/types/modiapersonoversikt-api';

export const PersonBadges = () => {
    const { data } = usePersonData();
    const person = data?.person;

    if (!person) {
        return null;
    }

    return (
        <>
            <DodBadge dodsdato={person.dodsdato} />
            <Heading visuallyHidden size="xsmall" level="3">
                Viktig informasjon
            </Heading>
            <DiskresjonskodeBadges adressebeskyttelser={person.adressebeskyttelse} />
            <EgenAnsattBadge erEgenansatt={person.erEgenAnsatt} />
            <SikkerhetstiltakBadge sikkerhetstiltak={person.sikkerhetstiltak} />
            <ReservertIKRRBadge kontaktInfo={person.kontaktInformasjon} />
            <ManuellStatusBadge kontaktInfo={person.kontaktInformasjon} />
            <VergemalBadge vergemal={person.vergemal} />
            <TilrettelagtKommunikasjonsBadge tilrettelagtKommunikasjon={person.tilrettelagtKommunikasjon} />
            <DodsboBadge dodsbo={person.dodsbo} />
            <FullmaktBadge fullmakt={person.fullmakt} />
        </>
    );
};

function DiskresjonskodeBadges({ adressebeskyttelser }: { adressebeskyttelser: PersonData['adressebeskyttelse'] }) {
    const adressebeskyttelse = adressebeskyttelser.firstOrNull();
    if (
        !adressebeskyttelse?.kode ||
        adressebeskyttelse?.kode === AdresseBeskyttelseKode.UGRADERT ||
        adressebeskyttelse?.kode === AdresseBeskyttelseKode.UKJENT
    ) {
        return null;
    }
    return (
        <Tag data-color="danger" variant="moderate" size="small">
            {adressebeskyttelse?.beskrivelse}
        </Tag>
    );
}

function EgenAnsattBadge({ erEgenansatt }: { erEgenansatt: PersonData['erEgenAnsatt'] }) {
    if (erEgenansatt === 'JA') {
        return (
            <Tag data-color="danger" size="small" variant="moderate">
                Egen ansatt
            </Tag>
        );
    }
    return null;
}

function SikkerhetstiltakBadge({ sikkerhetstiltak }: { sikkerhetstiltak: PersonData['sikkerhetstiltak'] }) {
    if (sikkerhetstiltak.isEmpty()) {
        return null;
    }

    return (
        <Tag data-color="danger" size="small" variant="moderate">
            Sikkerhetstiltak
        </Tag>
    );
}

function ReservertIKRRBadge({ kontaktInfo }: { kontaktInfo: PersonData['kontaktInformasjon'] }) {
    if (kontaktInfo?.erReservert?.value) {
        return (
            <Tag data-color="warning" size="small" variant="moderate">
                Reservert i KRR
            </Tag>
        );
    }
    if (kontaktInfo && !kontaktInfo.epost?.value && !kontaktInfo.mobil?.value) {
        return (
            <Tag data-color="warning" size="small" variant="moderate">
                Ikke registrert i KRR
            </Tag>
        );
    }
    return null;
}

function ManuellStatusBadge({ kontaktInfo }: { kontaktInfo: PersonData['kontaktInformasjon'] }) {
    const erManuell = kontaktInfo?.erManuell || kontaktInfo?.erReservert?.value;

    if (erManuell) {
        return (
            <Tag data-color="info" size="small" variant="moderate">
                Manuell oppfølging
            </Tag>
        );
    }
    return null;
}

function VergemalBadge({ vergemal }: { vergemal: PersonData['vergemal'] }) {
    if (vergemal.isEmpty()) {
        return null;
    }

    return (
        <Tag data-color="info" size="small" variant="moderate">
            Vergemål
        </Tag>
    );
}

function TilrettelagtKommunikasjonsBadge({
    tilrettelagtKommunikasjon
}: {
    tilrettelagtKommunikasjon: PersonData['tilrettelagtKommunikasjon'];
}) {
    const talesprakEtikett = !tilrettelagtKommunikasjon.talesprak.isEmpty() ? (
        <Tag data-color="info" size="small" variant="moderate">
            Talespråktolk
        </Tag>
    ) : null;
    const tegnsprakEtikett = !tilrettelagtKommunikasjon.tegnsprak.isEmpty() ? (
        <Tag data-color="info" size="small" variant="moderate">
            Tegnspråktolk
        </Tag>
    ) : null;

    return (
        <>
            {talesprakEtikett}
            {tegnsprakEtikett}
        </>
    );
}

function DodBadge({ dodsdato }: { dodsdato: PersonData['dodsdato'] }) {
    if (dodsdato.isEmpty()) {
        return null;
    }

    return (
        <Tag data-color="danger" size="small" variant="moderate">
            Død
        </Tag>
    );
}

function DodsboBadge({ dodsbo }: { dodsbo: PersonData['dodsbo'] }) {
    if (dodsbo.isEmpty()) {
        return null;
    }

    return (
        <Tag data-color="info" size="small" variant="moderate">
            Dødsbo
        </Tag>
    );
}

function FullmaktBadge({ fullmakt }: { fullmakt: PersonData['fullmakt'] }) {
    if (fullmakt.isEmpty()) {
        return null;
    }

    return (
        <Tag data-color="info" size="small" variant="moderate">
            Fullmakt
        </Tag>
    );
}
