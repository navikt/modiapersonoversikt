import * as React from 'react';
import VisittkortElement from '../../VisittkortElement';
import CoinsIkon from '../../../../../../svg/Coins';
import { Normaltekst } from 'nav-frontend-typografi';
import { FormatertKontonummer } from '../../../../../../utils/FormatertKontonummer';
import { Bankkonto as BankkontoInterface } from '../../../PersondataDomain';
import Endringstekst from '../../Endringstekst';

interface Props {
    bankkonto: BankkontoInterface | null;
}

function Bankkonto({ bankkonto }: Props) {
    let beskrivelse = 'Kontonummer';
    if (bankkonto && bankkonto.landkode && bankkonto.landkode.kode !== 'NOR') {
        beskrivelse += 'utland';
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
