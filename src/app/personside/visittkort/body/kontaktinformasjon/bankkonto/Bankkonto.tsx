import * as React from 'react';
import styled from 'styled-components';
import { Normaltekst } from 'nav-frontend-typografi';
import VisittkortElement from '../../VisittkortElement';
import { Person } from '../../../../../../models/person/person';
import { formaterDato } from '../../../../../../utils/dateUtils';
import { endretAvTekst } from '../../../../../../utils/endretAvUtil';
import EtikettGrå from '../../../../../../components/EtikettGrå';
import CoinsIkon from '../../../../../../svg/Coins';

const Kontonummer = styled.span`
  span:not(:last-child):after {
    content: '.';
  }
`;

interface BankkontoProps {
    person: Person;
}

function formaterKontonummer(kontonummer: string) {
    if (kontonummer.length === 11) {
        return [
            kontonummer.substr(0, 4),
            kontonummer.substr(4, 2),
            kontonummer.substr(6, 5)
        ];
    } else {
        return [kontonummer];
    }
}

function Bankkonto({person}: BankkontoProps) {
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
        const formatertKontonummer = formaterKontonummer(String(person.bankkonto.kontonummer));
        return (
            <>
                <Normaltekst>
                    <Kontonummer>
                        {formatertKontonummer.map(
                            (delString, index) => <span key={index}>{delString}</span>
                        )}
                    </Kontonummer>
                </Normaltekst>
                <EtikettGrå>Endret {formatertDato} {endretAv}</EtikettGrå>
            </>
        );
    }

    return <Normaltekst>Ikke registrert</Normaltekst>;
}

export default Bankkonto;