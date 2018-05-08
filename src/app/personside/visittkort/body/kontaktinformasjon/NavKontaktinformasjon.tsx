import * as React from 'react';
import VisittkortElement from '../VisittkortElement';
import { formaterDato } from '../../../../../utils/dateUtils';
import { NavKontaktinformasjon, Telefon } from '../../../../../models/person/NAVKontaktinformasjon';
import Undertekst from 'nav-frontend-typografi/lib/undertekst';
import EtikettMini from '../../../../../components/EtikettMini';
import { formaterHustelefonnummer, formaterMobiltelefonnummer } from '../../../../../utils/telefon-utils';

interface Props {
    navKontaktinformasjon: NavKontaktinformasjon;
}

function Telefon(props: {formatertNummer: string, formatertDato: string, beskrivelse: string}) {
    return (
        <>
            <Undertekst>{props.formatertNummer} ({props.beskrivelse})</Undertekst>
            <EtikettMini>Endret {props.formatertDato}</EtikettMini>
        </>
    );
}

function Mobiltelefon(props: {mobil?: Telefon}) {
    if (!props.mobil) {
        return null;
    }
    const formatertDato = formaterDato(props.mobil.sistEndret);
    const formatertTelefonnummer = formaterMobiltelefonnummer(props.mobil.nummer);
    return <Telefon formatertNummer={formatertTelefonnummer} formatertDato={formatertDato} beskrivelse={'Mobil'}/>;
}

function JobbTelefon(props: {jobbTelefon?: Telefon}) {
    if (!props.jobbTelefon) {
        return null;
    }
    const formatertDato = formaterDato(props.jobbTelefon.sistEndret);
    const formatertTelefonnummer = formaterHustelefonnummer(props.jobbTelefon.nummer);
    return <Telefon formatertNummer={formatertTelefonnummer} formatertDato={formatertDato} beskrivelse={'Jobb'}/>;

}

function HjemTelefon(props: {hjemTelefon?: Telefon}) {
    if (!props.hjemTelefon) {
        return null;
    }
    const formatertDato = formaterDato(props.hjemTelefon.sistEndret);
    const formatertTelefonnummer = formaterHustelefonnummer(props.hjemTelefon.nummer);
    return <Telefon formatertNummer={formatertTelefonnummer} formatertDato={formatertDato} beskrivelse={'Hjem'}/>;

}

export default function NavKontaktinformasjon({navKontaktinformasjon}: Props) {
    if (!navKontaktinformasjon.hjemTelefon && !navKontaktinformasjon.jobbTelefon && !navKontaktinformasjon.mobil) {
        return null;
    }

    return (
        <VisittkortElement beskrivelse="Telefon til bruk for NAV">
                <Mobiltelefon mobil={navKontaktinformasjon.mobil}/>
                <JobbTelefon jobbTelefon={navKontaktinformasjon.jobbTelefon}/>
                <HjemTelefon hjemTelefon={navKontaktinformasjon.hjemTelefon}/>
        </VisittkortElement>
    );
}