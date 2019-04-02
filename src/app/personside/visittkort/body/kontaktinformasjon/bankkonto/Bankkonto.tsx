import * as React from 'react';
import { Normaltekst } from 'nav-frontend-typografi';
import VisittkortElement from '../../VisittkortElement';
import { Person } from '../../../../../../models/person/person';
import { formaterDato } from '../../../../../../utils/stringFormatting';
import { endretAvTekst } from '../../../../../../utils/endretAvUtil';
import EtikettGrå from '../../../../../../components/EtikettGrå';
import CoinsIkon from '../../../../../../svg/Coins';
import { FormatertKontonummer } from '../../../../../../utils/FormatertKontonummer';

interface BankkontoProps {
    person: Person;
}

function Bankkonto({ person }: BankkontoProps) {
    let beskrivelse = 'Kontonummer';
    if (person.bankkonto && person.bankkonto.landkode && person.bankkonto.landkode.kodeRef !== 'NOR') {
        beskrivelse += ' utland';
    }

    return (
        <VisittkortElement beskrivelse={beskrivelse} ikon={<CoinsIkon />}>
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
                <Normaltekst>
                    <FormatertKontonummer kontonummer={person.bankkonto.kontonummer} />
                </Normaltekst>
                <EtikettGrå>
                    Endret {formatertDato} {endretAv}
                </EtikettGrå>
            </>
        );
    }

    return <Normaltekst>Ikke registrert</Normaltekst>;
}

export default Bankkonto;
