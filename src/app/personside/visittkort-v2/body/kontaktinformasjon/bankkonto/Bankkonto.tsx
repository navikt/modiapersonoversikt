import * as React from 'react';
import VisittkortElement from '../../VisittkortElement';
import CoinsIkon from '../../../../../../svg/Coins';
import { Normaltekst } from 'nav-frontend-typografi';
import { FormatertKontonummer } from '../../../../../../utils/FormatertKontonummer';
import { Person } from '../../../PersondataDomain';
import Endringstekst from '../../Endringstekst';

interface Props {
    person: Person;
}

function Bankkonto({ person }: Props) {
    let beskrivelse = 'Kontonummer';
    if (person.bankkonto && person.bankkonto.landkode && person.bankkonto.landkode.kode !== 'NOR') {
        beskrivelse += 'utland';
    }

    if (!person.bankkonto) {
        return <Normaltekst>Ikke registrert</Normaltekst>;
    }

    return (
        <VisittkortElement beskrivelse={beskrivelse} ikon={<CoinsIkon />}>
            <Normaltekst>
                <FormatertKontonummer kontonummer={person.bankkonto.kontonummer} />
            </Normaltekst>
            <Endringstekst sistEndret={person.bankkonto.sistEndret} />
        </VisittkortElement>
    );
}

export default Bankkonto;
