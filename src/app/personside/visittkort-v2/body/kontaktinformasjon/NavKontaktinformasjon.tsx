import { Feilmelding, Normaltekst } from 'nav-frontend-typografi';
import { formaterMobiltelefonnummer } from '../../../../../utils/telefon-utils';
import type { Telefon as TelefonInterface } from '../../PersondataDomain';
import Endringstekst from '../Endringstekst';
import VisittkortElement from '../VisittkortElement';

interface Props {
    harFeilendeSystem: boolean;
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

function NavKontaktinformasjon({ harFeilendeSystem, telefonnummer }: Props) {
    if (harFeilendeSystem) {
        return (
            <VisittkortElement beskrivelse="Telefon til bruk for NAV">
                <Feilmelding>Feilet ved uthenting av kontaktinformasjon</Feilmelding>
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
