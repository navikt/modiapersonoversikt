import * as React from 'react';
import VisittkortElement from '../VisittkortElement';
import { formaterMobiltelefonnummer } from '../../../../../utils/telefon-utils';
import { Normaltekst } from 'nav-frontend-typografi';
import { Telefon as TelefonInterface } from '../../PersondataDomain';
import Endringstekst from '../Endringstekst';
import FeilendeSystemAdvarsel from '../../FeilendeSystemAdvarsel';

interface Props {
    feilendeSystem: boolean;
    telefonnummer: TelefonInterface[];
}

function Telefon(props: { telefonnummer: TelefonInterface }) {
    const formatertNummer = formaterMobiltelefonnummer(props.telefonnummer.identifikator);
    const retningsnummmer = props.telefonnummer.retningsnummer ? props.telefonnummer.retningsnummer.kode : '';
    return (
        <>
            <Normaltekst>{`${retningsnummmer} ${formatertNummer}`}</Normaltekst>
            <Endringstekst sistEndret={props.telefonnummer.sistEndret} />
        </>
    );
}

function NavKontaktinformasjon({ feilendeSystem, telefonnummer }: Props) {
    if (feilendeSystem) {
        return (
            <VisittkortElement beskrivelse="Telefon til bruk for NAV">
                <FeilendeSystemAdvarsel>Feilet ved uthenting av kontaktinformasjon</FeilendeSystemAdvarsel>
            </VisittkortElement>
        );
    }
    if (telefonnummer.isEmpty()) {
        return null;
    }

    return (
        <VisittkortElement beskrivelse="Telefon til bruk for NAV">
            {telefonnummer
                .sort((nr1, nr2) => nr1.prioritet - nr2.prioritet)
                .map((telefonnummer) => (
                    <Telefon telefonnummer={telefonnummer} key={telefonnummer.identifikator} />
                ))}
        </VisittkortElement>
    );
}

export default NavKontaktinformasjon;
