import * as React from 'react';
import VisittkortElement from '../../VisittkortElement';
import CoinsIkon from '../../../../../../svg/Coins';
import { Normaltekst } from 'nav-frontend-typografi';
import { FormatertKontonummer } from '../../../../../../utils/FormatertKontonummer';
import { Bankkonto as BankkontoInterface } from '../../../PersondataDomain';
import Endringstekst from '../../Endringstekst';
import FeilendeSystemAdvarsel from '../../../FeilendeSystemAdvarsel';

interface Props {
    feilendeSystem: boolean;
    bankkonto: BankkontoInterface | null;
}

function Bankkonto({ feilendeSystem, bankkonto }: Props) {
    let beskrivelse = 'Kontonummer';
    if (bankkonto && bankkonto.landkode && bankkonto.landkode.kode !== 'NOR') {
        beskrivelse += 'utland';
    }

    if (feilendeSystem) {
        return (
            <VisittkortElement beskrivelse={beskrivelse} ikon={<CoinsIkon />}>
                <FeilendeSystemAdvarsel>Feilet ved uthenting av kontonummer</FeilendeSystemAdvarsel>
            </VisittkortElement>
        );
    }

    if (!bankkonto) {
        return (
            <VisittkortElement beskrivelse={beskrivelse} ikon={<CoinsIkon />}>
                <Normaltekst>Ikke registrert</Normaltekst>
            </VisittkortElement>
        );
    }

    return (
        <VisittkortElement beskrivelse={beskrivelse} ikon={<CoinsIkon />}>
            <Normaltekst>
                <FormatertKontonummer kontonummer={bankkonto.kontonummer} />
            </Normaltekst>
            <Endringstekst sistEndret={bankkonto.sistEndret} />
        </VisittkortElement>
    );
}

export default Bankkonto;
