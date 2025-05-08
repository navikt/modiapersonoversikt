import { HStack, Heading, Tag } from '@navikt/ds-react';
import { usePersonData } from 'src/lib/clients/modiapersonoversikt-api';
import { AdresseBeskyttelseKode, type PersonData } from 'src/lib/types/modiapersonoversikt-api';

export const PersonBadges = () => {
    const {
        data: { person }
    } = usePersonData();

    return (
        <HStack align="center" gap="1" as="section" className="flex-1">
            <DodBadge dodsdato={person.dodsdato} />
            <Heading visuallyHidden size="xsmall" level="3">
                Etiketter
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
        </HStack>
    );
};

function DiskresjonskodeBadges({
    adressebeskyttelser
}: {
    adressebeskyttelser: PersonData['adressebeskyttelse'];
}) {
    const adressebeskyttelse = adressebeskyttelser.firstOrNull();
    if (
        !adressebeskyttelse?.kode ||
        adressebeskyttelse?.kode === AdresseBeskyttelseKode.UGRADERT ||
        adressebeskyttelse?.kode === AdresseBeskyttelseKode.UKJENT
    ) {
        return null;
    }
    return (
        <Tag variant="error" size="small">
            {adressebeskyttelse?.beskrivelse}
        </Tag>
    );
}

function EgenAnsattBadge({
    erEgenansatt
}: {
    erEgenansatt: PersonData['erEgenAnsatt'];
}) {
    if (erEgenansatt === 'JA') {
        return (
            <Tag size="small" variant="error">
                Egen ansatt
            </Tag>
        );
    }
    return null;
}

function SikkerhetstiltakBadge({
    sikkerhetstiltak
}: {
    sikkerhetstiltak: PersonData['sikkerhetstiltak'];
}) {
    if (sikkerhetstiltak.isEmpty()) {
        return null;
    }

    return (
        <Tag size="small" variant="error">
            Sikkerhetstiltak
        </Tag>
    );
}

function ReservertIKRRBadge({
    kontaktInfo
}: {
    kontaktInfo: PersonData['kontaktInformasjon'];
}) {
    if (kontaktInfo?.erReservert?.value) {
        return (
            <Tag size="small" variant="warning">
                Reservert i KRR
            </Tag>
        );
    }
    if (kontaktInfo && !kontaktInfo.epost?.value && !kontaktInfo.mobil?.value) {
        return (
            <Tag size="small" variant="warning">
                Ikke registrert i KRR
            </Tag>
        );
    }
    return null;
}

function ManuellStatusBadge({
    kontaktInfo
}: {
    kontaktInfo: PersonData['kontaktInformasjon'];
}) {
    const erManuell = kontaktInfo?.erManuell || kontaktInfo?.erReservert?.value;

    if (erManuell) {
        return (
            <Tag size="small" variant="info">
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
        <Tag size="small" variant="info">
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
        <Tag size="small" variant="info">
            Talespråktolk
        </Tag>
    ) : null;
    const tegnsprakEtikett = !tilrettelagtKommunikasjon.tegnsprak.isEmpty() ? (
        <Tag size="small" variant="info">
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
        <Tag size="small" variant="error">
            Død
        </Tag>
    );
}

function DodsboBadge({ dodsbo }: { dodsbo: PersonData['dodsbo'] }) {
    if (dodsbo.isEmpty()) {
        return null;
    }

    return (
        <Tag size="small" variant="info">
            Dødsbo
        </Tag>
    );
}

function FullmaktBadge({ fullmakt }: { fullmakt: PersonData['fullmakt'] }) {
    if (fullmakt.isEmpty()) {
        return null;
    }

    return (
        <Tag size="small" variant="info">
            Fullmakt
        </Tag>
    );
}
