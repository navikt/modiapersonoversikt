import * as React from 'react';
import Undertekst from 'nav-frontend-typografi/lib/undertekst';

import VisittkortElement from '../VisittkortElement';
import EtikettMini from '../../../../../components/EtikettMini';

import { NavKontaktinformasjon, Telefon } from '../../../../../models/person/NAVKontaktinformasjon';
import { formaterHustelefonnummer, formaterMobiltelefonnummer } from '../../../../../utils/telefon-utils';
import { formaterDato } from '../../../../../utils/dateUtils';
import { endretAvTekst } from '../../../../../utils/endretAvUtil';

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
    return (
        <>
            <Undertekst>{`${telefon.retningsnummer} ${formatertNummer}`} ({beskrivelse})</Undertekst>
            <EtikettMini>Endret {formatertDato} {endretAv}</EtikettMini>
        </>
    );
}

export default function NavKontaktinformasjon(props: {navKontaktinformasjon: NavKontaktinformasjon}) {
    const {navKontaktinformasjon} = props;
    if (!navKontaktinformasjon.hjem && !navKontaktinformasjon.jobb && !navKontaktinformasjon.mobil) {
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
                telefon={navKontaktinformasjon.hjem}
                beskrivelse={'Hjem'}
            />
            <Telefon
                nummerFormaterer={formaterHustelefonnummer}
                telefon={navKontaktinformasjon.jobb}
                beskrivelse={'Jobb'}
            />
        </VisittkortElement>
    );
}