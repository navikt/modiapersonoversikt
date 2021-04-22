import * as React from 'react';
import VisittkortElement from '../VisittkortElement';
import EtikettGraa from '../../../../../components/EtikettGraa';
import {
    NavKontaktinformasjon as NavKontaktinformasjonInterface,
    Telefon as TelefonInterface
} from '../../../../../models/person/NAVKontaktinformasjon';
import {
    formaterHustelefonnummer,
    formaterMobiltelefonnummer,
    formaterTelefonnummer
} from '../../../../../utils/telefon-utils';
import { formaterDato } from '../../../../../utils/string-utils';
import { endretAvTekst } from '../../../../../utils/endretAvUtil';
import { Normaltekst } from 'nav-frontend-typografi';

interface TelefonProps {
    nummerFormaterer: (nummer: string) => string;
    telefon?: TelefonInterface;
    beskrivelse: string;
}

function Telefon({ telefon, nummerFormaterer, beskrivelse }: TelefonProps) {
    if (!telefon) {
        return null;
    }
    const formatertDato = formaterDato(telefon.sistEndret);
    const endretAv = endretAvTekst(telefon.sistEndretAv);
    const formatertNummer = nummerFormaterer(telefon.identifikator);
    const retningsnummmer = telefon.retningsnummer ? telefon.retningsnummer.kodeRef : '';
    return (
        <>
            <Normaltekst>
                {`${retningsnummmer} ${formatertNummer}`} {beskrivelse}
            </Normaltekst>
            <EtikettGraa>
                Endret {formatertDato} {endretAv}
            </EtikettGraa>
        </>
    );
}

interface Props {
    navKontaktinformasjon: NavKontaktinformasjonInterface;
    telefonnummer?: Array<TelefonInterface>;
}

export default function NavKontaktinformasjon(props: Props) {
    const { navKontaktinformasjon } = props;

    if (props.telefonnummer && props.telefonnummer.length > 0) {
        const telefonNummer = props.telefonnummer.map(telefon => (
            <Telefon telefon={telefon} nummerFormaterer={formaterTelefonnummer} beskrivelse="" />
        ));

        return <VisittkortElement beskrivelse="Telefon til bruk for NAV">{telefonNummer}</VisittkortElement>;
    }
    if (!navKontaktinformasjon.hjemTelefon && !navKontaktinformasjon.jobbTelefon && !navKontaktinformasjon.mobil) {
        return null;
    }

    return (
        <VisittkortElement beskrivelse="Telefon til bruk for NAV">
            <Telefon
                nummerFormaterer={formaterMobiltelefonnummer}
                telefon={navKontaktinformasjon.mobil}
                beskrivelse={'(Mobil)'}
            />
            <Telefon
                nummerFormaterer={formaterHustelefonnummer}
                telefon={navKontaktinformasjon.hjemTelefon}
                beskrivelse={'(Hjem)'}
            />
            <Telefon
                nummerFormaterer={formaterHustelefonnummer}
                telefon={navKontaktinformasjon.jobbTelefon}
                beskrivelse={'(Jobb)'}
            />
        </VisittkortElement>
    );
}
