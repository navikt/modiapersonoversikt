import * as React from 'react';

import VisittkortElement from '../VisittkortElement';
import EtikettGrå from '../../../../../components/EtikettGrå';

import { NavKontaktinformasjon, Telefon } from '../../../../../models/person/NAVKontaktinformasjon';
import { formaterHustelefonnummer, formaterMobiltelefonnummer } from '../../../../../utils/telefon-utils';
import { formaterDato } from '../../../../../utils/dateUtils';
import { endretAvTekst } from '../../../../../utils/endretAvUtil';
import { Normaltekst } from 'nav-frontend-typografi';

interface TelefonProps {
    nummerFormaterer: (nummer: string) => string;
    telefon?: Telefon;
    beskrivelse: string;
}

function Telefon({telefon, nummerFormaterer, beskrivelse}: TelefonProps) {
    if (!telefon) {
        return null;
    }
    const formatertDato = formaterDato(telefon.sistEndret);
    const endretAv = endretAvTekst(telefon.sistEndretAv);
    const formatertNummer = nummerFormaterer(telefon.identifikator);
    const retningsnummmer = telefon.retningsnummer ? telefon.retningsnummer.kodeRef : '';
    return (
        <>
            <Normaltekst>{`${retningsnummmer} ${formatertNummer}`} ({beskrivelse})</Normaltekst>
            <EtikettGrå>Endret {formatertDato} {endretAv}</EtikettGrå>
        </>
    );
}

export default function NavKontaktinformasjon(props: {navKontaktinformasjon: NavKontaktinformasjon}) {
    const {navKontaktinformasjon} = props;
    if (!navKontaktinformasjon.hjemTelefon && !navKontaktinformasjon.jobbTelefon && !navKontaktinformasjon.mobil) {
        return null;
    }

    return (
        <VisittkortElement beskrivelse="Telefon til bruk for NAV">
            <Telefon
                nummerFormaterer={formaterMobiltelefonnummer}
                telefon={navKontaktinformasjon.mobil}
                beskrivelse={'Mobil'}
            />
            <Telefon
                nummerFormaterer={formaterHustelefonnummer}
                telefon={navKontaktinformasjon.hjemTelefon}
                beskrivelse={'Hjem'}
            />
            <Telefon
                nummerFormaterer={formaterHustelefonnummer}
                telefon={navKontaktinformasjon.jobbTelefon}
                beskrivelse={'Jobb'}
            />
        </VisittkortElement>
    );
}