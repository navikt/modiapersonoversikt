import * as React from 'react';
import { Foreldrepengerperiode } from '../../../../../models/ytelse/foreldrepenger';
import styled from 'styled-components';
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
import KommendeUtbetalinger from '../utbetalinger/kommendeUtbetalinger/KommendeUtbetalinger';
import YtelserInfoGruppe from '../felles-styling/YtelserInfoGruppe';

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
