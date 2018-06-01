import * as React from 'react';
import styled from 'styled-components';
import Undertekst from 'nav-frontend-typografi/lib/undertekst';
import VisittkortElement from '../../VisittkortElement';
import { Person } from '../../../../../../models/person/person';
import { formaterDato } from '../../../../../../utils/dateUtils';
import { endretAvTekst } from '../../../../../../utils/endretAvUtil';
import EtikettMini from '../../../../../../components/EtikettMini';
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
    if (person.bankkonto) {
        beskrivelse += person.bankkonto.erNorskKonto ? '' : ' utland';
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
                <Undertekst>
                    <Kontonummer>
                        {formatertKontonummer.map(
                            (delString, index) => <span key={index}>{delString}</span>
                        )}
                    </Kontonummer>
                </Undertekst>
                <EtikettMini>Endret {formatertDato} {endretAv}</EtikettMini>
            </>
        );
    }

    return <Undertekst>Ikke registrert</Undertekst>;
}

export default Bankkonto;