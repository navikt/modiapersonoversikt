import * as React from 'react';
import { Foreldrepengerperiode } from '../../../../../models/ytelse/foreldrepenger';
import Utbetalinger from '../utbetalinger/Utbetalinger';
import styled from 'styled-components/macro';
import theme from '../../../../../styles/personOversiktTheme';
import DescriptionList, {
    DescriptionListEntries,
    fjernEntriesUtenVerdi
} from '../../../../../components/DescriptionList';
import YtelserPeriode from '../felles-styling/YtelserPeriode';
import {
    convertBoolTilJaNei,
    formaterDato,
    periodeEllerNull,
    prosentEllerNull
} from '../../../../../utils/stringFormatting';
import { YtelserKeys } from '../ytelserKeys';

interface Props {
    periode: Foreldrepengerperiode;
    periodenr: number;
}

const Padding = styled.div`
    margin: ${theme.margin.px10} ${theme.margin.px20} ${theme.margin.px40};
`;

const Flex = styled.div`
    display: flex;
`;

const Stor = styled.div`
    flex-basis: 55%;
`;

const Liten = styled.div`
    flex-basis: 45%;
`;

function ForeldrepengePeriode({ periode, periodenr }: Props) {
    const entries: DescriptionListEntries = {
        ...fjernEntriesUtenVerdi({
            'Arbeidsprosent mor': prosentEllerNull(periode.arbeidsprosentMor),
            'Mors situasjon': periode.morSituasjon,
            'Disponibel gradering': prosentEllerNull(periode.disponibelGradering),
            Forskyvelsesperiode: periodeEllerNull(periode.forskyvelsesperiode1),
            Forskyvelsesårsak: periode.forskyvelsesårsak1,
            'Andre forskyvelsesperiode': periodeEllerNull(periode.forskyvelsesperiode2),
            'Andre forskyvelsesårsak': periode.forskyvelsesårsak2
        }),
        'Midlertidig stans': periode.midlertidigStansDato,
        ...fjernEntriesUtenVerdi({
            Stansårsak: periode.stansårsak,
            Avslått: periode.avslått
        }),
        Mødrekvote: convertBoolTilJaNei(periode.erMødrekvote),
        'Rett til Mødrekvote': periode.rettTilMødrekvote,
        'Aleneomsorg Mor': convertBoolTilJaNei(periode.harAleneomsorgMor),
        Fedrekvote: convertBoolTilJaNei(periode.erFedrekvote),
        'Rett til Fedrekvote': periode.rettTilFedrekvote,
        'Aleneomsorg Far': convertBoolTilJaNei(periode.harAleneomsorgFar)
    };
    return (
        <YtelserPeriode tittel={`Periode ${periodenr} - ${formaterDato(periode.foreldrepengerFom)}`}>
            <Flex>
                <Liten>
                    <Padding>
                        <DescriptionList entries={entries} />
                    </Padding>
                </Liten>
                <Stor>
                    <Utbetalinger
                        kommendeUtbetalinger={periode.kommendeUtbetalinger}
                        ytelsesType={YtelserKeys.Foreldrepenger}
                    />
                </Stor>
            </Flex>
        </YtelserPeriode>
    );
}

export default ForeldrepengePeriode;
