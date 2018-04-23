import * as React from 'react';
import styled from 'styled-components';
import Undertekst from 'nav-frontend-typografi/lib/undertekst';
import EtikettLiten from 'nav-frontend-typografi/lib/etikett-liten';
import VisittkortElement from '../VisittkortElement';
import { Person } from '../../../../../models/person';
import { formaterDato } from '../../../../../utils/dateUtils';
import { endretAvTekst } from '../../../../../utils/endretAvUtil';

const coinsPath = require('../../../../../resources/svg/coins.svg');

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
                <EtikettLiten>Endret {formatertDato} {endretAv}</EtikettLiten>
            </>
        );
    }

    return <Undertekst>Ingen kontonummer registrert</Undertekst>;
}

export default Bankkonto;