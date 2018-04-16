import * as React from 'react';
import { Person } from '../../../../../models/person';
import Undertekst from 'nav-frontend-typografi/lib/undertekst';
import EtikettLiten from 'nav-frontend-typografi/lib/etikett-liten';
import { formaterDato } from '../../../../../utils/dateUtils';
import { endretAvTekst } from '../../../../../utils/endretAvUtil';

interface BankKontoProps {
    person: Person;
}

function BankKonto({person}: BankKontoProps) {
    if (person.bankkonto) {
        const formatertDato = formaterDato(person.bankkonto.sistEndret);
        const endretAv = endretAvTekst(person.bankkonto.sistEndretAv);
        return (
            <>
                <Undertekst>{person.bankkonto.kontonummer}</Undertekst>
                <EtikettLiten>Endret {formatertDato} {endretAv}</EtikettLiten>
            </>
        );
    }
    return (
        <Undertekst>Ingen kontonummer registrert</Undertekst>
    );
}

export default BankKonto;