import VisittkortElement from '../../VisittkortElement';
import CoinsIkon from '../../../../../../svg/Coins';
import { Feilmelding, Normaltekst } from 'nav-frontend-typografi';
import { FormatertKontonummer } from '../../../../../../utils/FormatertKontonummer';
import { Bankkonto as BankkontoInterface } from '../../../PersondataDomain';
import KontoEndringsTekst from './KontoEndringstekst';

interface Props {
    harFeilendeSystem: boolean;
    bankkonto: BankkontoInterface | null;
}

function Bankkonto({ harFeilendeSystem, bankkonto }: Props) {
    let beskrivelse = 'Kontonummer';
    if (bankkonto && bankkonto.landkode && bankkonto.landkode.kode !== 'NOR') {
        beskrivelse += 'utland';
    }

    if (harFeilendeSystem) {
        return (
            <VisittkortElement beskrivelse={beskrivelse} ikon={<CoinsIkon />}>
                <Feilmelding>Feilet ved uthenting av kontonummer</Feilmelding>
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
            <KontoEndringsTekst sistEndret={bankkonto.sistEndret} />
        </VisittkortElement>
    );
}

export default Bankkonto;
