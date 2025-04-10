import type { Foreldrepengerperiode } from 'src/models/ytelse/foreldrepenger';
import { convertBoolTilJaNei, formaterDato, periodeEllerNull, prosentEllerNull } from 'src/utils/string-utils';
import styled from 'styled-components';
import DescriptionList, {
    type DescriptionListEntries,
    fjernEntriesUtenVerdi
} from '../../../../../components/DescriptionList';
import theme from '../../../../../styles/personOversiktTheme';
import YtelserInfoGruppe from '../felles-styling/YtelserInfoGruppe';
import YtelserPeriode from '../felles-styling/YtelserPeriode';
import KommendeUtbetalinger from '../utbetalinger/kommendeUtbetalinger/KommendeUtbetalinger';

interface Props {
    periode: Foreldrepengerperiode;
    periodenr: number;
}

const Wrapper = styled.article`
    padding: ${theme.margin.layout};
`;

function ForeldrepengePeriode({ periode, periodenr }: Props) {
    const entries: DescriptionListEntries = {
        ...fjernEntriesUtenVerdi({
            'Arbeidsprosent mor': prosentEllerNull(periode.arbeidsprosentMor),
            'Mors situasjon': periode.morSituasjon,
            'Disponibel gradering': prosentEllerNull(periode.disponibelGradering),
            Forskyvelsesperiode: periodeEllerNull(periode.forskyvelsesperiode1),
            Forskyvelsesårsak: periode.forskyvelsesaarsak1,
            'Andre forskyvelsesperiode': periodeEllerNull(periode.forskyvelsesperiode2),
            'Andre forskyvelsesårsak': periode.forskyvelsesaarsak2
        }),
        'Midlertidig stans': periode.midlertidigStansDato,
        ...fjernEntriesUtenVerdi({
            Stansårsak: periode.stansaarsak,
            Avslått: periode.avslaatt
        }),
        Mødrekvote: convertBoolTilJaNei(periode.erModrekvote),
        'Rett til Mødrekvote': periode.rettTilModrekvote,
        'Aleneomsorg Mor': convertBoolTilJaNei(periode.harAleneomsorgMor),
        Fedrekvote: convertBoolTilJaNei(periode.erFedrekvote),
        'Rett til Fedrekvote': periode.rettTilFedrekvote,
        'Aleneomsorg Far': convertBoolTilJaNei(periode.harAleneomsorgFar)
    };
    return (
        <YtelserPeriode tittel={`Periode ${periodenr} - ${formaterDato(periode.foreldrepengerFom)}`}>
            <Wrapper>
                <YtelserInfoGruppe tittel="Om foreldrepengeperioden">
                    <DescriptionList entries={entries} />
                </YtelserInfoGruppe>
                <KommendeUtbetalinger kommendeUtbetalinger={periode.kommendeUtbetalinger} />
            </Wrapper>
        </YtelserPeriode>
    );
}

export default ForeldrepengePeriode;
