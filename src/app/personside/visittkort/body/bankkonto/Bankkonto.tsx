import * as React from 'react';
import { Person } from '../../../../../models/person';
import Undertekst from 'nav-frontend-typografi/lib/undertekst';
import EtikettLiten from 'nav-frontend-typografi/lib/etikett-liten';
import { formaterDato } from '../../../../../utils/dateUtils';
import { endretAvTekst } from '../../../../../utils/endretAvUtil';
import VisittkortElement from '../VisittkortElement';

const coinsPath = require('../../../../../resources/svg/coins.svg');

interface BankkontoProps {
    person: Person;
}

function Bankkonto({person}: BankkontoProps) {
    return (
        <VisittkortElement beskrivelse="Kontonummer" ikonPath={coinsPath}>
            {kontoinfo(person)}
        </VisittkortElement>
    );
}

function kontoinfo(person: Person) {
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

    return <Undertekst>Ingen kontonummer registrert</Undertekst>;
}

export default Bankkonto;