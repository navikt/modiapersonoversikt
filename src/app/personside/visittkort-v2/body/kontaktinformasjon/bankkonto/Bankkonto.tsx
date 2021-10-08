import * as React from 'react';
import VisittkortElement from '../../VisittkortElement';
import CoinsIkon from '../../../../../../svg/Coins';
import { formaterDato } from '../../../../../../utils/string-utils';
import { endretAvTekst } from '../../../../../../utils/endretAvUtil';
import { Normaltekst } from 'nav-frontend-typografi';
import { FormatertKontonummer } from '../../../../../../utils/FormatertKontonummer';
import EtikettGraa from '../../../../../../components/EtikettGraa';
import { Person } from '../../../PersondataDomain';

interface Props {
    person: Person;
}

function Bankkonto({ person }: Props) {
    let beskrivelse = 'Kontonummer';
    if (person.bankkonto && person.bankkonto.landkode && person.bankkonto.landkode.kode !== 'NOR') {
        beskrivelse += 'utland';
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
                <EtikettGraa>
                    Endret {formatertDato} {endretAv}
                </EtikettGraa>
            </>
        );
    }

    return <Normaltekst>Ikke registrert</Normaltekst>;
}

export default Bankkonto;
